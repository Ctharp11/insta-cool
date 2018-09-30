const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const passport = require('passport');
require('../handlers/passport');

//cors stuff
router.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Credentials");
    next();
});

//api routes
router.get('/api', postController.getPosts);
router.post('/api', 
    postController.type, 
    postController.cloudinary
);
router.get('/api/:id', postController.getSingle);
router.get('/api/posts/:id', postController.getUserPosts);
router.post('/api/liked/:id', postController.likedPost);
router.post('/api/comment/:id', postController.postComment);

//user routes
router.get('/users/secret', 
    passport.authenticate('jwt', { session: false }), 
    userController.secret
);

router.post('/users/oauth/facebook', 
    passport.authenticate('facebook', { session: false }),
    userController.facebookOAuth
);

router.get('/auth/facebook', passport.authenticate('facebook'), (req, res) => {
    res.end();
});

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: `https://insta-cool.herokuapp.com/`, // tell it where to go if they couldn't log in
    successRedirect: `https://insta-cool.herokuapp.com/account`, // tell it where to go if the log in successfully
  }));

// router.get('/auth/facebook', passport.authenticate('spotify'), (req, res) => {
//     res.end();
//   });
//   // here's the URL spotify will call back to finish logging them into your site
//   router.get('/auth/facebook/callback', passport.authenticate('spotify', {
//     failureRedirect: `${baseUrl}/auth/failed`, // tell it where to go if they couldn't log in
//     successRedirect: `${baseUrl}/testspotify`, // tell it where to go if the log in successfully
//   }));




module.exports = router;