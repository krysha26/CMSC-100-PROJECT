const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/:id", orderController.getOrder);
router.get("/user/:email", orderController.getOrderByUser);
router.get("/", orderController.getAllOrders);
router.post("/", orderController.addOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
