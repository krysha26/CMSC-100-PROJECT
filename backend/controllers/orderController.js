import Order from '../models/Order.js';
import Product from '../models/Product.js';

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
    const order = await Order.findById(req.params.id).populate("productId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // If the order is being cancelled (status changed to 2)
    if (req.body.orderStatus === 2 && order.orderStatus !== 2) {
      // Get the product and restore its stock
      const product = await Product.findById(order.productId._id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Update the product's stock directly
      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        { productQuantity: product.productQuantity + order.orderQuantity },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(500).json({ message: "Failed to update product stock" });
      }
    }

    // Update the order status
    const updated = await Order.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    ).populate("productId");
    
    res.json(updated);
  } catch (err) {
    console.error('Error updating order:', err);
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