const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { postSchema } = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const Profile = require('./models/profile');
const BlogPost = require('./models/blogpost');

mongoose.connect('mongodb://localhost:27017/porterFamily')
    .then(() => {
        console.log('connection open')
    })
    .catch(err => {
        console.log(err)
    })

mongoose.set('strictQuery', true);

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('models', path.join(__dirname, '/models'));

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.get('/', catchAsync(async (req, res) =>{
    const profiles = await Profile.find({})
    res.render('index', {profiles})
}))

app.get('/college-savings', catchAsync(async (req, res) =>{
    const profiles = await Profile.find({})
    res.render('college-savings', {profiles})
}))

app.get('/family-member', catchAsync(async (req, res) => {
    const profiles = await Profile.find({})
    res.render('family-member/index', {profiles})
}))

app.get('/family-member/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    res.render('family-member/show', { profile, profiles, blogPosts })
}))

app.get('/family-member/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const profiles = await Profile.find({})
    res.render('family-member/edit', { profile, profiles })
}))

app.put('/family-member/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/family-member/${ profile._id }`)
}))

//BLOG ROUTES
app.get('/family-member/:id/blog', catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    res.render('family-member/blog/index', { profile, profiles, blogPosts })
}))

app.get('/family-member/:id/blog/new', catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const profiles = await Profile.find({});
    res.render('family-member/blog/new', { profile, profiles });
}))

app.post('/family-member/:id/blog', validatePost, catchAsync(async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const blogPost = new BlogPost(req.body.blogPost);
    profile.blogPosts.push(blogPost);
    blogPost.profile = profile;
    await profile.save();
    await blogPost.save();
    res.redirect(`/family-member/${profile._id}/blog`)
}))

app.get('/family-member/:id/blog/:postId', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPost = await BlogPost.findById(postId).populate('profile', 'name');
    const blogPosts = await BlogPost.find({profile: id}).sort({date:-1});
    res.render('family-member/blog/show', { profile, profiles, blogPost, blogPosts })
}))

app.get('/family-member/:id/blog/:postId/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    const blogPost = await BlogPost.findById(postId);
    res.render(`family-member/blog/edit`, { profile, profiles, blogPost })
}))

app.put('/family-member/:id/blog/:postId', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id);
    const blogPost = await BlogPost.findByIdAndUpdate(postId, req.body, { runValidators: true, new: true });
    res.redirect(`/family-member/${ profile._id }/blog/${ blogPost._id }`)
}))

app.delete('/family-member/:id/blog/:postId', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { postId } = req.params;
    const profile = await Profile.findById(id)
    await BlogPost.findByIdAndDelete(postId);
    res.redirect(`/family-member/${ profile._id }/blog`);
}))
//

app.use(function(req, res, next){
    res.status(404).render('page-not-found', { title: "Sorry, page not found" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${ port }`)
})