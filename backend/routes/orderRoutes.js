import express from "express";
import { 
    getOrder, 
    getOrderByUser, 
    getAllOrders, 
    addOrder, 
    updateOrder, 
    deleteOrder 
} from "../controllers/orderController.js";
import { auth, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - require authentication
router.use(auth);

// Customer routes
router.get("/my-orders", getOrderByUser); // Get own orders
router.post("/", addOrder); // Create order
router.delete("/:id", deleteOrder); // Delete own order

// Admin routes
router.get("/", checkRole(['admin']), getAllOrders); // Get all orders (admin only)
router.get("/:id", checkRole(['admin']), getOrder); // Get specific order (admin only)
router.put("/:id", checkRole(['admin']), updateOrder); // Update order status (admin only)

export default router;