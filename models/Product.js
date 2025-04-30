import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: String,
  productDescription: String,
  productType: Number, // 1 Crop / 2 Poultry
  productPrice: Number,
  productQuantity: Number,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
