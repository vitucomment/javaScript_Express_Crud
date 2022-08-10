const Joi = require('joi');

const userQuerySchema = Joi.object({
    id: Joi.string().required()
});

const userDefaultBodySchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    birthDate: Joi.string().required()
});

module.exports = {
    userQuerySchema,
    userDefaultBodySchema
}