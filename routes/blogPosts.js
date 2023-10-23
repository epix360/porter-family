const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
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

router.get('/:id/blog', catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    res.render('family-member/blog/index', { profile, profiles, blogPosts })
}))

router.get('/:id/blog/new', catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const profiles = await Profile.find({});
    res.render('family-member/blog/new', { profile, profiles });
}))

router.post('/:id/blog', validatePost, catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const blogPost = new BlogPost(req.body.blogPost);
    profile.blogPosts.push(blogPost);
    blogPost.profile = profile;
    await profile.save();
    await blogPost.save();
    res.redirect(`/family-member/${profile._id}/blog`)
}))

router.get('/:id/blog/:postId', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPost = await BlogPost.findById(postId).populate('profile', 'name');
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    res.render('family-member/blog/show', { profile, profiles, blogPost, blogPosts })
}))

router.get('/:id/blog/:postId/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPost = await BlogPost.findById(postId);
    res.render('family-member/blog/edit', { profile, profiles, blogPost })
}))

router.put('/:id/blog/:postId', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id);
    const blogPost = await BlogPost.findByIdAndUpdate(postId, req.body, { runValidators: true, new: true });
    res.redirect(`/family-member/${ profile._id }/blog/${ blogPost._id }`)
}))

router.delete('/:id/blog/:postId', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id)
    await BlogPost.findByIdAndDelete(postId);
    res.redirect(`/family-member/${ profile._id }/blog`);
}))

module.exports = router;