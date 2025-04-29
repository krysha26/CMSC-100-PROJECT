const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getUser);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);
router.post("/signOut", userController.signOut);

module.exports = router;
