const express = require('express');
const router = express.Router();
const productsRoutes = require('../routes/productsRoutes');

router.use('/products', productsRoutes);

module.exports = router;