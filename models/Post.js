const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', postSchema);
