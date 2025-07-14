const express = require('express');
const { editUser, deleteUser } = require('../controllers/userController');
const authRoutes = express.Router();

authRoutes.put('/editUser', editUser);
authRoutes.delete('/deleteUser', deleteUser);

module.exports = authRoutes;