const express = require('express');
const attributeRoutes = express.Router();
const { addAttributes } = require('../controllers/attributeController');
const verifyToken = require('../middlewares/authMiddleware');

attributeRoutes.post('/ ', verifyToken, addAttributes);

module.exports = attributeRoutes;