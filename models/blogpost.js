const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const PostSchema = new Schema({
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

PostSchema.plugin(passportLocalMongoose);

const BlogPost = mongoose.model('BlogPost', PostSchema);

module.exports = BlogPost;