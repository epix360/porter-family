const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug)

// const ImageSchema = new Schema({
//     imageId: String
// });

const PostSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    imageIds: [String],
    profile: {
        type: Schema.Types.ObjectID.name,
        ref: 'Profile'
    },
    date: {
        type: Date,
        default: () => new Date()
    },
    slug: {
        type: String,
        slug: 'title',
        slug_padding_size: 2,
        unique: true,
    }
});

PostSchema.plugin(passportLocalMongoose);

const BlogPost = mongoose.model('BlogPost', PostSchema);

module.exports = BlogPost;