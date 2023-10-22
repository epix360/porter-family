const mongoose = require('mongoose');
const { Schema }  = mongoose;

const postSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    profile: {
        type: Schema.Types.ObjectID.name,
        ref: 'Profile'
    },
    date: { 
        type: Date,
        default: () => new Date()
    }
})

const BlogPost = mongoose.model('BlogPost', postSchema);

module.exports = BlogPost;