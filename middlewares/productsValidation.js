const Joi = require('joi');

function validate(schema, req, res) {
  const { error } = schema.validate(req.body, {abortEarly: false});
  if (error) {
    const messages = error.details.map(err => err.message).join(", ");
    res.status(400).json({ message: messages });
    return true;
  }
  return false;
}

//frontend sends in this order: name, price: parseFloat(price), description, category,image_url: imageUrl, user_id
const postProductSchema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    price: Joi.number().positive().precision(2).required(),
    description: Joi.string().min(10).max(500).required(),
    category : Joi.string().valid("Books", "Games", "Electronics", "Clothing", "Toys", "Home & Kitchen", "Beauty", "Sports", "Art & Collectibles", "Music").required(),
    //image_url: Joi.string().uri().pattern(/\.(jpg|jpeg|png|gif|webp|bmp)$/i).required(),
    image_url: Joi.string().uri().required(),
    user_id: Joi.number().positive().required(),
});

//frontend sends in this order: id, name, price: parseFloat(price), description, category, image_url: imageUrl, user_id
const putProductSchema = Joi.object({
    id: Joi.number().positive().required(), 
    name: Joi.string().min(3).max(40).required(),
    price: Joi.number().positive().precision(2).required(),
    description: Joi.string().min(10).max(500).required(),
    category: Joi.string().valid("Books", "Games", "Electronics", "Clothing", "Toys", "Home & Kitchen", "Beauty", "Sports", "Art & Collectibles", "Music").required(),
    image_url: Joi.string().uri().pattern(/\.(jpg|jpeg|png|gif|webp|bmp)$/i).required(),
    user_id: Joi.number().positive().required(),
});

const deleteProductSchema = Joi.object({
    id: Joi.number().positive().required(),
    user_id: Joi.number().positive().required()
});

function validatePost(req, res) {
    return validate(postProductSchema, req, res);
}

function validatePut(req, res) {
    return validate(putProductSchema, req, res);
}

function validateDelete(req, res) {
    return validate(deleteProductSchema, req, res);
}

module.exports = {
    validatePost,
    validatePut,
    validateDelete
};