const Post = require('../models/Post');
const cloudinary = require('cloudinary');
const multer  = require('multer');
var upload = multer({ dest: 'uploads' });

require('dotenv').config({})
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET
});

exports.getPosts = async (req, res) => {
    try {
       const posts = await Post.find() 
        res.json(posts);
    }
    catch(err) {
        console.log('error happening', err)
    }
}

exports.type = upload.single('file');

exports.uppic = (req, res, next) => {
    try {
        res.status(200).json({status: "200"});
        next();
    }
    catch(err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"});
    }
}

exports.cloudinary = (req, res) => {
    console.log('files', req.file.path);
    const obj = JSON.parse(req.body.bodyInfo)
    cloudinary.v2.uploader.upload(`./${req.file.path}`, function(err, result) {
        if (err) console.log(err)
        console.log(result)
        var post = new Post({
            text: obj.text,
            likes: obj.likes,
            file: result.url,
            file_id: result.public_id
        });
        post.save()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
}