const express = require('express');
const database = require('../config/db');

const getUserById = async (id) => {
    try {
        const [rows] = await database.promise().query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    } catch(error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try{
        const [rows] = await database.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch(error) {
        throw error;
    }
};

async function createUser(name, email, passwordHash) {
    try {
        const [result] = await database.promise().query('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
                [name, email, passwordHash]
            );
        return { id: result.insertId, username: name, email };
    } catch(error) {
        throw error;
    }
}

async function editUser(name, email, passwordHash) {
    try {
        console.log("TODO");
    } catch(error) {
        throw error;
    }
}

async function deleteUser(id) {
    try {
        console.log("TODO");
    } catch(error) {
        throw error;
    }
}

module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
    editUser,
    deleteUser
};