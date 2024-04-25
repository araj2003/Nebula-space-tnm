const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authController");

const subcategoryController = require("./../controllers/subcategoryController");
const categoryController = require("./../controllers/categoryController");
const productController = require("./../controllers/productController");
const articleController = require("./../controllers/articleController");
const bannerController = require("./../controllers/bannerController");
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authController.protect);
router.use(authController.restrictTo("editor"));

router.route("/subcategory").get(subcategoryController.allSubCategory);

router.route("/category").get(categoryController.allCategoryTypes);

router
	.route("/product")
	.get(productController.getAllProducts)
	.post(productController.createProduct);
router
	.route("/product/:id")
	.get(productController.getProductbyid)
	.patch(productController.updateProduct)
	.delete(productController.deleteProduct);

module.exports = router;
