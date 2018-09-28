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

exports.cloudinary = async (req, res) => {
    try {
      const obj = JSON.parse(req.body.bodyInfo)
      const cloud = await cloudinary.v2.uploader.upload(`./${req.file.path}`, (err, result) => {
        if (err) return err
        return result;
      });
      const post = new Post({
        text: obj.text,
        likes: obj.likes,
        author: {
            id: obj.author._id,
            first_name: obj.author.facebook.first_name,
            last_name: obj.author.facebook.last_name,
            photo: obj.author.facebook.photo
        },
        file: cloud.secure_url,
        file_id: cloud.public_id
      });
      await post.save()
      res.status(200).json(post)
    }
    catch(err) {
        res.status(500).json(err);
    }
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
        const likedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            {
                "$inc": { "likes": 1 },
                "$push": { "likedBy": req.body.userid }
            },
            {new: true}
        )
        console.log(likedPost)

    }
    catch(err) {
        res.status(500).json(err)
    }
}