import Order from '../models/Order.js';

// GET /api/orders/:id
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("productId");
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders/user/:email
const getOrderByUser = async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email }).populate("productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/orders
const addOrder = async (req, res) => {
  console.log("confriming")
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/orders/:id
const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/orders/:id
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export {getOrder, getOrderByUser, getAllOrders, addOrder, updateOrder, deleteOrder};