const express = require('express');
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply protect middleware to all routes in this file
router.use(protect);

router.route('/')
    .post(createPost)
    .get(getPosts);

router.route('/:id')
    .get(getPostById)
    .put(updatePost)
    .delete(deletePost);

module.exports = router;