const Profile = require('../models/profile');
const BlogPost = require('../models/blogPost');

module.exports.renderFamilyIndex = async (req, res) => {
    const profiles = await Profile.find({})
    res.render('family-member/index', { profiles })
}

module.exports.renderNewProfile = async (req, res) => {
    const profiles = await Profile.find({})
    res.render('family-member/new', { profiles });
}

module.exports.postNewProfile = async (req, res) => {
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
}

module.exports.renderProfilePage = async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    if (!profile) {
        req.flash('error', 'Cannot find that profile!');
        return res.redirect('/');
    }
    res.render('family-member/show', { profile, profiles, blogPosts })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const profiles = await Profile.find({});
    if (!profile) {
        req.flash('error', 'Cannot find that profile!');
        return res.redirect('/');
    }
    res.render('family-member/edit', { profile, profiles })
}

module.exports.editProfile = async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    req.flash('success', 'Successfully updated profile!');
    res.redirect(`/family-member/${ profile._id }`)
}