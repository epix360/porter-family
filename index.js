const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const catchAsync = require('./utils/catchAsync');
const methodOverride = require('method-override');

const profileRoutes = require('./routes/profiles');
const blogPostRoutes = require('./routes/blogPosts');

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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/', catchAsync(async (req, res) =>{
    const profiles = await Profile.find({})
    res.render('index', {profiles})
}))

app.get('/college-savings', catchAsync(async (req, res) =>{
    const profiles = await Profile.find({})
    res.render('college-savings', {profiles})
}))

//ROUTES
app.use('/family-member', profileRoutes);
app.use('/family-member', blogPostRoutes);

app.use(function(req, res, next){
    res.status(404).render('page-not-found', { title: "Sorry, page not found" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${ port }`)
})