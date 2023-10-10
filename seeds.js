const mongoose = require('mongoose');
const Profile = require('./models/profiles');

mongoose.connect('mongodb://localhost:27017/porterFamily')
    .then(() => {
        console.log('connection open')
    })
    .catch(err => {
        console.log(err)
    })

const seedProfiles = [
    {
        name: 'Eric',
        age: 37,
        photoUrl: 'https://photos.app.goo.gl/5BoRcuMXTnkMAE5q8'
    },
    {
        name: 'Tami',
        age: 38,
        photoUrl: 'https://photos.app.goo.gl/JUvtzx1tiB5CfawB6'
    },
    {
        name: 'Georgia',
        age: 10,
        photoUrl: 'https://photos.app.goo.gl/WZ1eLtBAU8ZTHnCU6'
    },
    {
        name: "Evie",
        age: 7,
        photoUrl: 'https://photos.app.goo.gl/rk5nzZvrCmv2xjew8'
    }
]

Profile.insertMany(seedProfiles)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})