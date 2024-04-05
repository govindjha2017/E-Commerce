const Joi = require('joi');
module.exports.productSchema = Joi.object({
    name: Joi.string().required(),
    price:Joi.number().min(0).required(),
    image:Joi.string().required(),
    desc: Joi.string().required()
})