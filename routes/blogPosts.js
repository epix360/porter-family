const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { postSchema } = require('../schemas.js');
const Profile = require('../models/profile');
const BlogPost = require('../models/blogPost');;

const validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    res.render('family-member/blog/index', { profile, profiles, blogPosts })
}))

router.get('/new', catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const profiles = await Profile.find({});
    res.render('family-member/blog/new', { profile, profiles });
}))

router.post('/', validatePost, catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const blogPost = new BlogPost(req.body.blogPost);
    profile.blogPosts.push(blogPost);
    blogPost.profile = profile;
    await profile.save();
    await blogPost.save();
    req.flash('success', 'Successfully created new blog post!');
    res.redirect(`/family-member/${profile._id}/blog`)
}))

router.get('/:postId', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPost = await BlogPost.findById(postId).populate('profile', 'name');
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    if (!blogPost) {
        req.flash('error', 'Post not found!');
        return res.redirect('/family-member/blog/show');
    }
    res.render('family-member/blog/show', { profile, profiles, blogPost, blogPosts })
}))

router.get('/:postId/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPost = await BlogPost.findById(postId);
    if (!postId) {
        req.flash('error', 'Post not found!');
        return res.redirect('/family-member/blog/edit');
    }
    res.render('family-member/blog/edit', { profile, profiles, blogPost })
}))

router.put('/:postId', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id);
    const blogPost = await BlogPost.findByIdAndUpdate(postId, req.body, { runValidators: true, new: true });
    req.flash('success', 'Successfully updated blog post!');
    res.redirect(`/family-member/${ profile._id }/blog/${ blogPost._id }`)
}))

router.delete('/:postId', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id)
    await BlogPost.findByIdAndDelete(postId);
    req.flash('success', 'Successfully deleted blog post')
    res.redirect(`/family-member/${ profile._id }/blog`);
}))

module.exports = router;