import express from "express";
import multer from "multer";
import path from "path";
import {
  getProduct,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.get("/:id", getProduct);
router.get("/", getAllProducts);
router.post("/", upload.single("photo"), addProduct); // Attach multer middleware here
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
