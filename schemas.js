const Joi = require('joi');

module.exports.postSchema = Joi.object({
    blogPost: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required()
    }).required()
});