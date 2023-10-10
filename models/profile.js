const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    photoUrl: {
        type: String
    },
    job: {
        type: String
    },
    bio: {
        type: String
    }
})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;