const Joi = require('joi');

const postProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().positive().precision(2).required(),
    description: Joi.string().min(10).max(500).required()
});

const putProductSchema = Joi.object({
    id: Joi.number().positive().required(), 
    name: Joi.string().min(3).max(100).required(), 
    price: Joi.number().positive().precision(2).required(), 
    description: Joi.string().min(10).max(500).required() 
});

const deleteProductSchema = Joi.object({
    id: Joi.number().positive().required()
});

function validatePost(req, res) {
    const { error } = postProductSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return true;
    }
    return false;
}

function validatePut(req, res) {
    const { error } = putProductSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return true;
    }
    return false;
}

function validateDelete(req, res) {
    const { error } = deleteProductSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return true;
    }
    return false;
}

module.exports = {
    validatePost,
    validatePut,
    validateDelete
};