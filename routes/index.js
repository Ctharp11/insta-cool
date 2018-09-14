const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

router.get('/', postController.getPosts);

router.post('/', multipartMiddleware, postController.postPost);

module.exports = router;