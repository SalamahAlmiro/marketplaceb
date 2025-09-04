const express = require('express');
const router = express.Router();
const productsRoutes = require('../routes/productsRoutes');
const authRoutes = require('../routes/authRoutes');
const userRoutes = require('../routes/userRoutes');
const attributeRoutes = require('../routes/attributeRoutes');

router.use('/products', productsRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products/:productId/attribute', attributeRoutes);

module.exports = router;