import passport from 'passport';
import User from '../models/user';
import config from '../config';

import { ExtractJwt } from 'passport-jwt';

const JwtStrategy = require('passport-jwt').Strategy; 

import LocalStrategy from 'passport-local';

const localOptions = { usernameField: 'email'};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

    //verify this username and password, call done with user
    //if it is the correct username and password
    //otherwise call done with false
    User.findOne({email: email}, (err, user) => {
        if(err) { return done(err); }
        if(!user) { return done(null, false); }

        // compare passwords is password equal to user.password?

        user.comparePassword(password, (err, isMatch) => {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }
    
            return done(null, user);
        });

    });

    

});

//setup options for jwt

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret

};


//create JWT strategy

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

    User.findById(payload.sub, (err, user) => {
        //done has 2 arguments one is err and other one is user if found otherwise false(didn't find user)
        if(err) { return done(err, false); }

        if(user) {
             done(null, user);
        } else {
            done(null, false);
        }
    });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);

