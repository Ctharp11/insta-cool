const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    text: {
        type: String
    },
    file: {
        type: String,
        required: "Please provide a photo!"
    },
    file_id: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: {
        type: [mongoose.Schema.ObjectId],
        ref: 'User'
    },
    author: {
        id: {
            type: String
        },
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        photo: {
            type: String
        }
    },
    comments: {
        text: {
            type: [String]
        }
    }
});

module.exports = mongoose.model('Post', postSchema);
