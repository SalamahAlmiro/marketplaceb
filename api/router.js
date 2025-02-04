const express = require('express');
const router = express.Router();
const productRoutes = require('../routes/productsRoutes');

router.use('/products', productRoutes);

module.exports = router;