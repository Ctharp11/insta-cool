const Post = require('../models/Post');
const cloudinary = require('cloudinary');
require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET
});

exports.getPosts = async (req, res) => {
    try {
       const posts = await Post.find() 
        res.json(posts);
    }
    catch(err) {
        console.log(err)
    }
}

exports.postPost = (req, res) => {
     // Use Cloudinary uploader to upload to cloudinary sever
      // Access files uploaded from the browser using req.files
      console.log(req.body, req.files);
    //   cloudinary.uploader.upload(req.files.image.path, function(result) {
    //     // Create a post model
    //     // by assembling all data as object
    //     // and passing to Model instance
    //     var post = new Post({
    //         text: req.body.text,
    //         // Store the URL in a DB for future use
    //         file: result.url,
    //         file_id: result.public_id
    //     });
    //     // Persist by saving
    //     post.save()
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
    // });
}