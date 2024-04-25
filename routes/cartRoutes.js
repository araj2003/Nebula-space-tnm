const express = require("express");
const cartController = require("./../controllers/cartController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use(authController.protect);

router.get("/", cartController.getAllMyCartItems);
router
  .route("/:id")
  .get(cartController.getMyCartItem)
  .patch(cartController.updateCartItem)
  .delete(cartController.deleteCartItem);

router.use(authController.restrictTo("admin"));

module.exports = router;
