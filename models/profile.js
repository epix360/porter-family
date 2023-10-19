const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
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
    },
    blogPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'BlogPost'
        }
    ]
})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;