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
    passport.authenticate('facebook', { session: false, successRedirect: '/account',
    failureRedirect: '/auth/facebook' }),
    userController.facebookOAuth
);

module.exports = router;