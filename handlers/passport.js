const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/Users');
require('dotenv').config();

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
         //find the user specified in token
         const user = await User.findById(payload.sub);
         //if user doesn't exist, handle it
         if (!user) {
             return done(null, false);
         }
         //otherwise, return the user
         done(null, user);
    }
    catch(err) {
        done(err, false)
    }
}));

passport.use('facebook', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ "facebook.id": profile.id })
        if (existingUser) {
            return done(null, existingUser);
        }

        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                photo: profile.photos[0].value
            }
        })
        await newUser.save();
        done(null, newUser);
    }
    catch(err) {
        done(err, false)
    }
}));
