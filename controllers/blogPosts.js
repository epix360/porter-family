const Profile = require('../models/profile');
const BlogPost = require('../models/blogpost');

module.exports.renderBlogIndex = async (req, res) => {
    const profile = await Profile.findOne({pname: { $eq: req.params.pname}});
    const profiles = await Profile.find({})
    const blogPosts = await BlogPost.find({profile: profile._id}).sort({date:-1});
    res.render('family-member/blog/index', { profile, profiles, blogPosts })
}

module.exports.renderNewPostForm = async (req, res) => {
    const profile = await Profile.findOne({pname: { $eq: req.params.pname}});
    const profiles = await Profile.find({});
    res.render('family-member/blog/new', { profile, profiles });
}

module.exports.renderNewPost = async (req, res) => {
    const profile = await Profile.findOne({pname: { $eq: req.params.pname}});
    const publicId = req.body.blogPost.imageIds;
    const idArr = publicId.split(',');
    const imageId = idArr;
    const blogPost = new BlogPost(req.body.blogPost);
    blogPost.imageIds = imageId;
    profile.blogPosts.push(blogPost);
    blogPost.profile = profile;
    await profile.save();
    await blogPost.save();
    req.flash('success', 'Successfully created new blog post!');
    res.redirect(`/family-member/${profile.pname}/blog`)
}

module.exports.renderBlogPost = async (req, res) => {
    const profile = await Profile.findOne({pname: { $eq: req.params.pname}})
    const profiles = await Profile.find({})
    const blogPost = await BlogPost.findOne({slug: {$eq: req.params.slug}}).populate('profile', 'name');
    const blogPosts = await BlogPost.find({profile: profile._id}).sort({date:-1});
    if (!blogPost) {
        req.flash('error', 'Post not found!');
        return res.redirect('/family-member/blog/show');
    }
    res.render('family-member/blog/show', { profile, profiles, blogPost, blogPosts })
}

module.exports.renderEditForm = async (req, res) => {
    const profile = await Profile.findOne({pname: { $eq: req.params.pname}});
    const profiles = await Profile.find({})
    const blogPost = await BlogPost.findOne({slug: {$eq: req.params.slug}});
    if (!req.params.slug) {
        req.flash('error', 'Post not found!');
        return res.redirect('/family-member/blog/edit');
    }
    res.render('family-member/blog/edit', { profile, profiles, blogPost })
}

module.exports.editBlogPost = async (req, res) => {
    const profile = await Profile.findOne({pname: { $eq: req.params.pname}});
    const blogPost = await BlogPost.findOneAndUpdate({slug: {$eq: req.params.slug}}, req.body, { runValidators: true, new: true });
    req.flash('success', 'Successfully updated blog post!');
    res.redirect(`/family-member/${ profile.pname }/blog/${ blogPost.slug }`)
}

module.exports.deleteBlogPost = async (req, res) => {
    const profile = await Profile.findOne({pname: { $eq: req.params.pname}})
    await BlogPost.findOneAndDelete({slug: {$eq: req.params.slug}});
    req.flash('success', 'Successfully deleted blog post')
    res.redirect(`/family-member/${ profile.pname }/blog`);
}