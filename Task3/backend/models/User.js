const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 50
    },
    email: { 
        type: String, 
        required: [true, 'Please provide an email'], 
        unique: true,
        match: [ // Regex to validate email format
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ],
        index: true // <-- OPTIMIZATION: Adds an index for faster queries on email
    },
    password: { 
        type: String, 
        required: [true, 'Please provide a password'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
