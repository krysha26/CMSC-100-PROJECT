const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  productType: Number, // 1 Crop / 2 Poultry
  productPrice: Number,
  productQuantity: Number,
});

module.exports = mongoose.model("Product", productSchema);
