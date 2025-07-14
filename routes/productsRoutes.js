const express = require('express');
const productRoutes = express.Router();
const { validatePost, validatePut, validateDelete } = require('../middlewares/productsValidation');
const { getProducts, createProduct, editProduct, deleteProduct } = require('../controllers/productsController');
const verifyToken = require('../middlewares/authMiddleware');

productRoutes.get('/', async (req, res) => {
    getProducts(req, res);
});

productRoutes.post('/', verifyToken, async (req, res) => {
    const Error = validatePost(req, res); 
    if (Error) return;
    await createProduct(req, res);
});

productRoutes.put('/', verifyToken, async (req, res) => {
    const Error = validatePut(req, res); 
    if (Error) return;
    await editProduct(req, res);
});

productRoutes.delete('/', verifyToken, async (req, res) => {
    const Error = validateDelete(req, res); 
    if (Error) return;
    await deleteProduct(req, res);
});

module.exports = productRoutes;