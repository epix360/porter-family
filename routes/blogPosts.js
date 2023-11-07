const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const posts = require('../controllers/blogPosts')
const { isLoggedIn, isAuthor, validateBlogPost } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage })

router.get('/', catchAsync(posts.renderBlogIndex))

router.get('/new', isLoggedIn, isAuthor, catchAsync(posts.renderNewPostForm))

router.post('/', isLoggedIn, isAuthor, upload.array('images'), catchAsync(posts.renderNewPost))

router.get('/:slug', catchAsync(posts.renderBlogPost))

router.get('/:slug/edit', isLoggedIn, isAuthor, catchAsync(posts.renderEditForm))

router.put('/:slug', isLoggedIn, isAuthor, upload.array('images'), catchAsync(posts.editBlogPost))

router.delete('/:slug', isLoggedIn, isAuthor, catchAsync(posts.deleteBlogPost))

module.exports = router;