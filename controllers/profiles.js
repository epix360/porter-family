const Profile = require('../models/profile');
const BlogPost = require('../models/blogpost');

module.exports.renderFamilyIndex = async (req, res) => {
    const profiles = await Profile.find({})
    res.render('family-member/index', { profiles })
}

module.exports.renderNewProfile = async (req, res) => {
    const profiles = await Profile.find({})
    res.render('family-member/new', { profiles });
}

module.exports.postNewProfile = async (req, res, next) => {
    try {
        const { name, pname, username, password, age, job, image, filename, bio } = req.body;
        const profile = new Profile({ name, pname, username, age, job, image, filename, bio });
        
        profile.image = req.file.path;
        profile.filename = req.file.filename;
        
        const registeredUser = await Profile.register(profile, password);
        
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'You\'re in!!');
            res.redirect('/family-member');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/family-member/new');
    }
};

module.exports.renderProfilePage = async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findOne({ pname: { $eq: req.params.pname } })
    const profiles = await Profile.find({})
    const blogPosts = await BlogPost.find({ profile: profile._id }).sort({ date: -1 });
    if (!profile) {
        req.flash('error', 'Cannot find that profile!');
        return res.redirect('/');
    }
    res.render('family-member/show', { profile, profiles, blogPosts })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findOne({ pname: { $eq: req.params.pname } });
    const profiles = await Profile.find({});
    if (!profile) {
        req.flash('error', 'Cannot find that profile!');
        return res.redirect('/');
    }
    res.render('family-member/edit', { profile, profiles })
}

module.exports.editProfile = async (req, res) => {
    let updateQuery = {};

    if (req.body.name) {
        updateQuery = req.body.name
    }

    const profile = await Profile.findOneAndUpdate({ pname: { $eq: req.params.pname } }, { ...req.body }, { runValidators: true, new: true });

    if (req.file) {
        profile.image = req.file.path;
        profile.filename = req.file.filename
    }

    await profile.save();
    req.flash('success', 'Successfully updated profile!');
    res.redirect(`/family-member/${profile.pname}`)
}