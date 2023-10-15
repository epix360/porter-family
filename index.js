const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const methodOverride = require('method-override');

const Profile = require('./models/profile');

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
    res.render('family-member/show', { profile, profiles })
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
    res.redirect(`/family-member/${profile._id}`)
}))

// app.use((err, req, res, next) => {
//     res.send('Something went wrong')
// })

app.use(function(req, res, next){
    res.status(404).render('page-not-found', {title: "Sorry, page not found"});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})