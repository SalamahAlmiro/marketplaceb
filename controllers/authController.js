const express = require('express');
const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../models/usersModel');
const generateToken = require('../utils/generateToken');

async function registerUser(req, res) {
    const { username, email, password } = req.body;
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(username, email, hashedPassword);
        const token = generateToken(newUser.id);
        console.log("user created:", "id:", newUser.id, "username:", newUser.username, "email:", newUser.email)
        return res.status(201).json({
            user: newUser,
            token,
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'User Name already in use.'});
        }
        console.error('Register error:', error);
        return res.status(500).json({ message: 'Server error'});
  }
} 

async function loginUser (req, res) {
    const {email, password} = req.body;
    try {
        const loggedUser = await getUserByEmail(email);
        if(!loggedUser) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, loggedUser.password_hash);
        if (isMatch) {
            const token = generateToken(loggedUser.id);
            console.log("user logged in:", "id:", loggedUser.id, "email:", loggedUser.email);
            res.status(200).json({
                user: { 
                    id: loggedUser.id,
                    username: loggedUser.username,
                    email: loggedUser.email,
                },
                token,
            });
        } else {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch(error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    registerUser,
    loginUser
};