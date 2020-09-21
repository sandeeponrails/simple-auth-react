import Authentication from './controllers/authentication';
import passportService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', {session: false});

const requireSignin = passport.authenticate('local', {session: false});
module.exports = (app) => {
    app.get("/",  ( req, res, next) =>{
        res.send("hello")
    });
    app.post("/signup", Authentication.signup);
    app.post('/signin', requireSignin, Authentication.signin)
}