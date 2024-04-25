const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const orderControllers = require("./../controllers/orderControllers");

router.use(authController.protect);

router.route("/new").post(orderControllers.newOrder);
router.route("/myorders").get(orderControllers.myOrders);
router.route("/:id").get(orderControllers.getSingleOrder);

router.use(authController.restrictTo("admin"));

router.route("/admin/all").get(orderControllers.getAllOrders);

router
	.route("/:id")
	.patch(orderControllers.updateOrderStatus)
	.delete(orderControllers.deleteOrder);

module.exports = router;
