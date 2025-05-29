import express from "express";
import { 
    getOrder, 
    getOrderByUser, 
    getAllOrders, 
    addOrder, 
    updateOrder, 
    deleteOrder 
  } from "../controllers/orderController.js";
  import authMiddleware from "../middleware/authMiddleware.js";
  
  const router = express.Router();

  router.get("/:id", authMiddleware, getOrder);
  router.get("/user/:email", authMiddleware, getOrderByUser);
  router.get("/", authMiddleware, getAllOrders);
  router.post("/", authMiddleware, addOrder);
  router.put("/:id", authMiddleware, updateOrder);
  router.delete("/:id", authMiddleware, deleteOrder);
  
  export default router;