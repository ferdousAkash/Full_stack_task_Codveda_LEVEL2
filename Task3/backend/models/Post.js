const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    user: { // <-- RELATIONSHIP: Links Post to a User
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Refers to the User model
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);