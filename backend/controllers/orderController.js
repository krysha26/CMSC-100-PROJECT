import Order from '../models/Order.js';

// GET /api/orders/my-orders
const getOrderByUser = async (req, res) => {
  try {
    // Use authenticated user's email
    const orders = await Order.find({ email: req.user.email }).populate("productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders/:id (admin only)
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("productId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/orders
const addOrder = async (req, res) => {
  try {
    // Add authenticated user's email to the order
    const orderData = {
      ...req.body,
      email: req.user.email,
      dateOrdered: new Date(),
      time: new Date().toLocaleTimeString()
    };
    const order = new Order(orderData);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/orders/:id (admin only)
const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    ).populate("productId");
    
    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/orders/:id
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user owns the order or is admin
    if (order.email !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to delete this order" });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { getOrder, getOrderByUser, getAllOrders, addOrder, updateOrder, deleteOrder };