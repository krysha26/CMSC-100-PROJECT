import express from "express";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  signUp,
  signIn,
  signOut,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, getUser);
router.get("/", authMiddleware, getAllUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/signOut", signOut);

export default router;
