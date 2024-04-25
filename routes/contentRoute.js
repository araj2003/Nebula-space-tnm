const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const subcategoryController = require("../controllers/subcategoryController");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const articleController = require("../controllers/articleController");
const bannerController = require("../controllers/bannerController");
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authController.protect);
router.use(authController.restrictTo("content"));

router
	.route("/article")
	.get(articleController.getAllArticleAdmin)
	.post(articleController.createArticle);
router
	.route("/article/:id")
	.patch(articleController.updateArticle)
	.delete(articleController.deleteArticle);

router.route("/banner").get(bannerController.getAllBanners);
router.route("/banner/:id").patch(bannerController.updateBanner);

module.exports = router;
