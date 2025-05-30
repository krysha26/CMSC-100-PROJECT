import express from "express";
import mongoose from "mongoose";  // You need this import for ObjectId validation
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  signUp,
  signIn,
  signOut,
  updateExistingUsers
} from "../controllers/userController.js";
import { auth, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes (no auth required)
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/signOut", signOut);

// Protected routes (auth required)
router.use(auth);  // Apply auth middleware to all routes below

// Admin only routes
router.get("/update-names", checkRole(['admin']), updateExistingUsers);

// Protected user management routes
router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
