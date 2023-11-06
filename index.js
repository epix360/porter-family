if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const catchAsync = require('./utils/catchAsync');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Profile = require('./models/profile');
const { storeReturnTo } = require('./middleware');
const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

const profileRoutes = require('./routes/profiles');
const blogPostRoutes = require('./routes/blogPosts');

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

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(mongoSanitize());

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
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://unpkg.com/",
    "https://cdn.quilljs.com"
];
const styleSrcUrls = [
    "https://cdn.jsdelivr.net/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://fonts.gstatic.com/",
    "https://unpkg.com/",
    "https://cdn.quilljs.com"
];
const connectSrcUrls = [
    "https://api.cloudinary.com/",
    "https://icanhazdadjoke.com/",
    "https://jsonplaceholder.typicode.com/",
    "https://api.tvmaze.com/"
];
const fontSrcUrls = [
    "https://fonts.gstatic.com/",
    "https://cdn.jsdelivr.net/"
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dzfjji5xy/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",,
                "https://static.tvmaze.com"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Profile.authenticate()));

passport.serializeUser(Profile.serializeUser());
passport.deserializeUser(Profile.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//ROUTES
app.use('/family-member', profileRoutes);
app.use('/family-member/:id/blog', blogPostRoutes);

//HOMEPAGE
app.get('/', catchAsync(async (req, res) =>{
    const profiles = await Profile.find({})
    res.render('index', { profiles })
}))

app.get('/login', catchAsync(async (req, res) =>{
    const profiles = await Profile.find({})
    res.render('login', { profiles })
}))

app.post('/login',
    storeReturnTo,
    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
    (req, res) => {
        req.flash('success', 'Welcome back!');
        const redirectUrl = res.locals.returnTo || '/';
        res.redirect(redirectUrl);
    });

app.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
});

app.get('/college-savings', catchAsync(async (req, res) =>{
    const profiles = await Profile.find({})
    res.render('college-savings', { profiles })
}))

app.get('/experiments', catchAsync(async (req, res) =>{
    const profiles = await Profile.find({})
    res.render('experiments', { profiles })
}))

app.get('/page-not-found', catchAsync(async (req, res) =>{
    const profiles = await Profile.find({})
    res.render('page-not-found', { profiles })
}))

app.use(function(req, res, next){
    res.status(404).render('page-not-found', { title: "Sorry, page not found" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${ port }`)
})