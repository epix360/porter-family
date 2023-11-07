const Profile = require('../models/profile');
const BlogPost = require('../models/blogpost');

module.exports.renderBlogIndex = async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    res.render('family-member/blog/index', { profile, profiles, blogPosts })
}

module.exports.renderNewPostForm = async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const profiles = await Profile.find({});
    res.render('family-member/blog/new', { profile, profiles });
}

module.exports.renderNewPost = async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const blogPost = new BlogPost(req.body.blogPost);
    profile.blogPosts.push(blogPost);
    blogPost.profile = profile;
    await profile.save();
    await blogPost.save();
    req.flash('success', 'Successfully created new blog post!');
    res.redirect(`/family-member/${profile._id}/blog`)
}

module.exports.renderBlogPost = async (req, res) => {
    const { id, postId } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPost = await BlogPost.findById(postId).populate('profile', 'name');
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    if (!blogPost) {
        req.flash('error', 'Post not found!');
        return res.redirect('/family-member/blog/show');
    }
    res.render('family-member/blog/show', { profile, profiles, blogPost, blogPosts })
}

module.exports.renderEditForm = async (req, res) => {
    const { id, postId } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPost = await BlogPost.findById(postId);
    if (!postId) {
        req.flash('error', 'Post not found!');
        return res.redirect('/family-member/blog/edit');
    }
    res.render('family-member/blog/edit', { profile, profiles, blogPost })
}

module.exports.editBlogPost = async (req, res) => {
    const { id, postId } = req.params;
    const profile = await Profile.findById(id);
    const blogPost = await BlogPost.findByIdAndUpdate(postId, req.body, { runValidators: true, new: true });
    req.flash('success', 'Successfully updated blog post!');
    res.redirect(`/family-member/${ profile._id }/blog/${ blogPost._id }`)
}

module.exports.deleteBlogPost = async (req, res) => {
    const { id, postId } = req.params;
    const profile = await Profile.findById(id)
    await BlogPost.findByIdAndDelete(postId);
    req.flash('success', 'Successfully deleted blog post')
    res.redirect(`/family-member/${ profile._id }/blog`);
}