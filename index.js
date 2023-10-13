const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose');
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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('models', path.join(__dirname, '/models'));

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', async (req, res) =>{
    const profiles = await Profile.find({})
    res.render('index', {profiles})
})

app.get('/family-member', async (req, res) => {
    const profiles = await Profile.find({})
    res.render('family-member/index', {profiles})
})

app.get('/family-member/:id', async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id)
    const profiles = await Profile.find({})
    res.render('family-member/show', { profile, profiles })
})

app.get('/family-member/:id/edit', async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    const profiles = await Profile.find({})
    res.render('family-member/edit', { profile, profiles })
})

app.put('/family-member/:id', async (req, res) => {
    const { id } = req.params;
    const profile = await Profile.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/family-member/${profile._id}`)
})

app.use((req, res) => {
    res.status(404).send('Not found')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})