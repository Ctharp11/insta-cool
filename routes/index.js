const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const passport = require('passport');
require('../handlers/passport');

//cors stuff
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//api routes
router.get('/api', postController.getPosts);
router.post('/api', 
    postController.type, 
    postController.uppic,
    postController.cloudinary
);
router.get('/api/:id', postController.getSingle);

//user routes
router.get('/users/secret', 
    passport.authenticate('jwt', { session: false }), 
    userController.secret
);

router.post('/users/oauth/facebook', 
    passport.authenticate('facebook', { session: false }),
    userController.facebookOAuth
);

// router.get('/user', userController.getUser);
// router.post('/api/user', userController.postUser);
// router.delete('/user/:id', userController.removeUser);

module.exports = router;