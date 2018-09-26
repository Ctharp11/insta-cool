const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ['facebook'],
        required: true
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
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
    }
})

module.exports = mongoose.model('User', userSchema);