import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  orderQuantity: Number,
  orderStatus: Number, // 0: Pending, 1: Completed, 2: Canceled
  email: String, // Ref to user
  dateOrdered: Date,
  time: String,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
