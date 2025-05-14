import express from "express";
import { 
    getOrder, 
    getOrderByUser, 
    getAllOrders, 
    addOrder, 
    updateOrder, 
    deleteOrder 
  } from "../controllers/orderController.js";

  const router = express.Router();

  router.get("/:id", getOrder);
  router.get("/user/:email", getOrderByUser);
  router.get("/", getAllOrders);
  router.post("/", addOrder);
  router.put("/:id", updateOrder);
  router.delete("/:id", deleteOrder);
  
  export default router;