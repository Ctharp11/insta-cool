const User = require('../models/Users');
const JWT = require('jsonwebtoken')
require('dotenv').config();

signToken = user => {
    return JWT.sign({
        iss: 'insta-cool',
        sub: user._id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day ahead
    }, process.env.JWT_SECRET)
}

exports.facebookOAuth = (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
}

exports.secret = (req, res, next) => {
    res.status(200).json({userInfo: req.user});
}
