import User from "../models/user";
import jwt from "jwt-simple";
import config from "../config";

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.signin = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) });
};
exports.signup = (req, res, next) => {
    console.log("==================", req.body); 
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(422).send({ error: "you must provide email and password" });
    }

    User.findOne({ email: email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        if (existingUser) {
            return res.status(422).send({ error: "Email is in use" });
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save(err => {
            if (err) {
                return next(err);
            }

            //Respond to request indicating the user was created
            res.json({ sucess: true, token: tokenForUser(user) });
        });
    });
};
