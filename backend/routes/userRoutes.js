import express from "express";
import {
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  signUp,
  signIn,
  signOut
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/signOut", signOut);

export default router;
