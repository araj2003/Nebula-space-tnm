const express = require("express");
const userController = require("../controllers/userContoller.js");
const cartController = require("../controllers/cartController.js");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/google/signup", authController.googleSignup);
router.post("/google/login", authController.googleLogin);

router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/activate/:token", authController.activateAccount);

// Protect all routes after this middleware
router.use(authController.protect);

// router.patch("/updateMyPassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);
router.get("/mycart", cartController.getAllMyCartItems);

router
	.route("/cart/:id")
	.get(cartController.getMyCartItem)
	.patch(cartController.updateCartItem)
	.delete(cartController.deleteCartItem);

router.use(authController.restrictTo("admin"));

router
	.route("/")
	.get(userController.getAllUsers)
	.post(userController.createUser);

router
	.route("/:id")
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;

////////////////////////////////////////////////////////////////
