const { getProductsModel, createProductModel, editProductModel, deleteProductModel } = require('../models/productsModel.js');

async function getProducts(req, res) {
    try {
        const products = await getProductsModel();
        return res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products", error);
        return res.status(500).json({ message: "Server error fetching products" });
    }
}

async function createProduct(req, res) {
    const { name, price, description } = req.body;

    try {
        const productId = await createProductModel(name, price, description);
        return res.status(201).json({ message: "Product created successfully", productId });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error creating product" });
    }
}

async function editProduct(req, res) {
    const { id, name, price, description } = req.body;

    try {
        const result = await editProductModel(id, name, price, description);
        if (result) {
            return res.status(200).json({ message: "Product updated successfully" });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error editing product:", error);
        return res.status(500).json({ message: "Server error editing product" });
    }
}

async function deleteProduct(req, res) {
    const { id } = req.body;

    try {
        const result = await deleteProductModel(id);
        if (result) {
            return res.status(200).json({ message: "Product deleted successfully" });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Server error deleting product" });
    }
}

module.exports = {
    getProducts,
    createProduct,
    editProduct,
    deleteProduct
};
