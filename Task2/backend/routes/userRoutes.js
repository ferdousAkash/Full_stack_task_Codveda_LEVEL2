const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// This is a sample controller function. In a real app,
// you would have a userController.js file.
const getUsers = async (req, res) => {
    // This data would normally come from your database
    const users = await require('../models/User').find({});
    res.status(200).json(users);
};
// All users (including admins) who are logged in can access their own profile
router.get('/profile', protect, (req, res) => res.json(req.user));

// Only admins can get a list of all users
router.get('/', protect, authorize('admin'), getUsers);


module.exports = router;