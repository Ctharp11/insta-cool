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
       res.status(200).json(posts);
    }
    catch(err) {
        res.status(500).json({ error: err})
    }
}

exports.type = upload.single('file');

exports.uppic = (req, res, next) => {
    try {
        res.status(200).json({status: "success"});
        next();
    }
    catch(err) {
        res.status(500).json({error: err});
    }
}

exports.cloudinary = (req, res) => {
    console.log('req.user', req.user);
    const obj = JSON.parse(req.body.bodyInfo)
    cloudinary.v2.uploader.upload(`./${req.file.path}`, function(err, result) {
        if (err) res.json({ error: err });
        var post = new Post({
            text: obj.text,
            likes: obj.likes,
            author: {
                id: obj.author._id,
                first_name: obj.author.facebook.first_name,
                last_name: obj.author.facebook.last_name,
                photo: obj.author.facebook.photo
            },
            file: result.url,
            file_id: result.public_id
        });
        post.save()
        .then(res => res)
        .catch(err => err)
    });
}

exports.getSingle = async (req, res) => {
    try{
        const single = await Post.find({ _id: req.params.id})
        res.status(200).json(single)
    }
    catch(err) {
        res.status(500).json(err)
    }
}

exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ "author.id": req.params.id })
        res.status(200).json(posts);
    }
    catch(err) {
        res.status(500).json(err)
    }
}

exports.likedPost = async (req, res) => {
    try {
        console.log(req.body)
        const likedPost = await Post.findByIdAndUpdate(
            req.body.id, 
            {
                likes: req.body.sendLike,
                likedBy: req.body.userId
            },
            {new: true}
        )
        console.log(likedPost)

    }
    catch(err) {
        res.status(500).json(err)
    }
}