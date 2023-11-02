const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const ProfileSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number,
        min: 0
    },
    job: {
        type: String
    },
    image: {
        type: String,
    },
    filename: {
        type: String
    },
    bio: {
        type: String
    },
    blogPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'BlogPost'
        }
    ]
})

ProfileSchema.plugin(passportLocalMongoose);

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;