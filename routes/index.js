const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/api', postController.getPosts);

router.post('/api', 
    postController.type, 
    postController.uppic,
    postController.cloudinary
);

router.get('/api/:id', postController.getSingle);

module.exports = router;