const Joi = require("joi");

const attributeSchema = Joi.object({
  attr_key: Joi.string().min(1).max(100).required(),
  attr_value: Joi.string().min(1).max(255).required()
});

const postAttributesSchema = Joi.array().items(attributeSchema).min(1);

module.exports = { postAttributesSchema };