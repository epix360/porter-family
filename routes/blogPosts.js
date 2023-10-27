const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const posts = require('../controllers/blogPosts')
const { isLoggedIn, isAuthor, validateBlogPost } = require('../middleware');

router.route('/')
    .get(catchAsync(posts.renderBlogIndex))
    .post(isLoggedIn, isAuthor, validateBlogPost, catchAsync(posts.renderNewPost))

router.get('/new', isLoggedIn, isAuthor, catchAsync(posts.renderNewPostForm))

router.route('/:postId')
    .get(catchAsync(posts.renderBlogPost))
    .put(isLoggedIn, isAuthor, catchAsync(posts.editBlogPost))
    .delete(isLoggedIn, isAuthor, catchAsync(posts.deleteBlogPost))

router.get('/:postId/edit', isLoggedIn, isAuthor, catchAsync(posts.renderEditForm))

module.exports = router;