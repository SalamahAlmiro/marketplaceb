const express = require('express');
const database = require('../config/db');

async function getProductsModel() {
    try {
        const [results] = await database.promise().query('SELECT * FROM products');
        console.log("Products fetched");
        return results;
    } catch (error) {
        throw new Error("Server error fetching products");
    }
}

async function createProductModel(productName, productPrice, productDescription) {
    try {
        const [results] = await database.promise().query('INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
                [productName, productPrice, productDescription]
            );
        console.log("Product Inserted");
        return results.insertId;  
    } catch (error) {
        throw new Error("Server error inserting Product"); 
    }
}

async function editProductModel(productId, newName, newPrice, newDescription) {
    try {
        const [results] = await database.promise().query('UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?', 
            [newName, newPrice, newDescription, productId]
        );
        if (results.affectedRows === 0) {
            console.log("No product found with the given ID.");
            return false;
        }

        console.log("Product Edited");
        return true;
    } catch (error) {
        console.error("Database error:", error);
        return false;
    }
}

async function deleteProductModel(productId) {
    try {
        const [results] = await database.promise().query('DELETE FROM products WHERE id = ?', [productId]
        );
        if (results.affectedRows === 0) {
            console.log("No product found with the given ID.");
            return false;
        }

        console.log(" Product deleted.");
        return true;
    } catch (error) {
        console.error("Database error:", error);
        return false;
    }
}

module.exports = {
    getProductsModel,
    createProductModel,
    editProductModel,
    deleteProductModel,
};

