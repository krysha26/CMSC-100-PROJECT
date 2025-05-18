import express from "express";
import {
  getProduct,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

