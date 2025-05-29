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
  try {
    const { productName, productDescription, productType, productPrice, productQuantity } = req.body;
    const photo = req.file ? req.file.path : null;

    const newProduct = new Product({
      productName,
      productDescription,
      productType,
      productPrice,
      productQuantity,
      photo
    });

    await newProduct.save();
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

const getImage = async (req, res) => {
  try {
    const productId = req.params.id;  // Extract the dynamic ID from the request
    const product = await Product.findById(productId);  // Find product by ID

    if (!product || !product.image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const imagePath = path.join(__dirname, '../uploads', product.image);  // Assuming product.image is the filename
    res.sendFile(imagePath);  // Send the image as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export { getProduct, getAllProducts, addProduct, updateProduct, deleteProduct, getImage };
