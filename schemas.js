const Joi = require('joi');

module.exports.postSchema = Joi.object({
    blogPost: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        image: Joi.string().optional().allow(null, '')
    }).required()
});

module.exports.profileSchema = Joi.object({
    profile: Joi.object({
        name: Joi.string().required(),
        age: Joi.string().required(),
        job: Joi.string().optional().allow(null, ''),
        bio: Joi.string().optional().allow(null, ''),
        blogPosts: Joi.string().optional().allow(null, '')
    }).required()
});