const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const BlogPostImgSchema = new Schema({
    asset_id: String,
    public_id: String,
    format: String,
    url: String,
    blogPost: {
        type: Schema.Types.ObjectID,
        ref: 'BlogPost'
    },
})

const BlogPostImage = mongoose.model('BlogPostImage', BlogPostImgSchema);

module.exports = BlogPostImage;