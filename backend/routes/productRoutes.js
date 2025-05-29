import express from "express";
import {
  getProduct,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, getProduct);
router.get("/", authMiddleware, getAllProducts);
router.post("/", authMiddleware, addProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;

