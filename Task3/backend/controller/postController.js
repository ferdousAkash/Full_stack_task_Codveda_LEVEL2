const Post = require('../models/Post');
const User = require('../models/User');

// @desc    Create a new post
// @route   POST /api/posts
exports.createPost = async (req, res) => {
    try {
        req.body.user = req.user.id; // Attach logged-in user's ID
        const post = await Post.create(req.body);
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all posts
// @route   GET /api/posts
exports.getPosts = async (req, res) => {
    try {
        // We use .populate() to fetch the related user's name and email
        const posts = await Post.find().populate('user', 'name email');
        res.status(200).json({ success: true, count: posts.length, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single post
// @route   GET /api/posts/:id
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'name email');
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
exports.updatePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Authorization check: Make sure user owns the post
        if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this post' });
        }

        post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Authorization check
        if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this post' });
        }

        await post.remove();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};