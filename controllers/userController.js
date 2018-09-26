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

// exports.postUser = (req, res) => {
//     console.log(req.body)
//     const user = new User(req.body).save(function(err) {
//         if (err) {
//             console.log(err);
//             res.status(500).json({error: `Internal server error ${err}`})
//             return;
//         }
//         res.status(200).json({status: "200"})
//     })
// }
// exports.getUser = async (req, res) => {
//     try {
//         const user = await User.find()
//         res.json(user);  
//     }
//     catch(err) {
//         res.status(500).json({error: `Internal server error ${err}`})
//     } 
// }
// exports.removeUser = async (req, res) => {
//     console.log(req.params.id)
//     const user = await User.findOneAndDelete({ _id: req.params.id});
//     console.log(user)
// }
