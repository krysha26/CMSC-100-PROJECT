const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  orderQuantity: Number,
  orderStatus: Number, // 0: Pending, 1: Completed, 2: Canceled
  email: String, // Ref to user
  dateOrdered: Date,
  time: String,
});

module.exports = mongoose.model("Order", orderSchema);
