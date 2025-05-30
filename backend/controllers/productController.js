import Product from '../models/Product.js';
import path from 'path';
import fs from 'fs';

// GET /api/products/:id
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/products
const addProduct = async (req, res) => {
  console.log("Adding product with body:", req.body);
  try {
    const { productName, productDescription, productType, productPrice, productQuantity, photo } = req.body;
    
    const newProduct = new Product({
      productName,
      productDescription,
      productType,
      productPrice,
      productQuantity,
      photo: photo || "https://via.placeholder.com/206x200" // Use provided URL or default placeholder
    });

    console.log("Creating new product:", newProduct);
    await newProduct.save();
    console.log("Product saved successfully:", newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { getProduct, getAllProducts, addProduct, updateProduct, deleteProduct };
