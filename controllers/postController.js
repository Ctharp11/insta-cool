const Post = require('../models/Post');
const cloudinary = require('cloudinary');
const multer  = require('multer')
const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log(file)
          cb(null, 'uploads')
        },
    fileFilter: (req, file, next) => {
        console.log(file)
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({message: 'That file type isn\'t allowed!'}, false);
        }
    }
})

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
        console.log('error happening', err)
    }
}

exports.upload = multer({storage: storage}).single('photo');

exports.cloudinary = (req, res) => {
      console.log('files', req.files);
      console.log('files', req.file);
      try {
         res.status(200).json({status: "200"});
      }
      catch(err) {
          console.log(err)
          res.status(500).json({error: "Internal server error"});
      }
      
      
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