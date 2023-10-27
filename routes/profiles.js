const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Profile = require('../models/profile');
const BlogPost = require('../models/blogPost');
const { isLoggedIn, isAuthor } = require('../middleware');

router.get('/', catchAsync(async (req, res) => {
    const profiles = await Profile.find({})
    res.render('family-member/index', { profiles })
}))

router.get('/new', isLoggedIn, catchAsync(async (req, res) => {
    const profiles = await Profile.find({})
    res.render('family-member/new', { profiles });
}))

router.post('/new', isLoggedIn, catchAsync(async (req, res) => {
    try {
        const { name, username, password, age, job, photoUrl, bio } = req.body;
        const user = new Profile({ name, username, age, job, photoUrl, bio });
        const registeredUser = await Profile.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'You\'re in!!');
            res.redirect('/family-member');
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/family-member/new')
    }
}));


router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    if (!profile) {
        req.flash('error', 'Cannot find that profile!');
        return res.redirect('/');
    }
    res.render('family-member/show', { profile, profiles, blogPosts })
}))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const profiles = await Profile.find({});
    if (!profile) {
        req.flash('error', 'Cannot find that profile!');
        return res.redirect('/');
    }
    res.render('family-member/edit', { profile, profiles })
}))

router.put('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    req.flash('success', 'Successfully updated profile!');
    res.redirect(`/family-member/${ profile._id }`)
}))

module.exports = router;