"use strict";
const Joi = require('joi');

function validateSchema(user) {
    const JoiSchema = Joi.object({
        username: Joi.string().min(1).max(20).required(),
        password: Joi.string()
            .pattern(new RegExp('^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,50}$')),
        confirm_password: Joi.ref('password'),
        dob: Joi.date().optional(),
        email: Joi.string().email(),
        
    }).with(
        'password', 'confirm_password'
    ).options({
        abortEarly: false,
    });
    return JoiSchema.validate(user);


}
exports.validateSchema = validateSchema;
