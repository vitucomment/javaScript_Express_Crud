const Joi = require('joi');

const tshirtBySizeQuerySchema = Joi.object({
    size: Joi.string().required(),
});

const tshirtQuerySchema = Joi.object({
    id: Joi.string().required(),
})

const tshirtBodySchema = Joi.object({
    id: Joi.number().required(),
    size: Joi.string().required(),
    description: Joi.string().required()
})

module.exports = {
    tshirtBySizeQuerySchema,
    tshirtQuerySchema,
    tshirtBodySchema
}