const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authController");

const orderController = require("./../controllers/orderControllers");
const userController = require("./../controllers/userContoller");
const subcategoryController = require("./../controllers/subcategoryController");
const categoryController = require("./../controllers/categoryController");
const productController = require("./../controllers/productController");
const reviewController = require("./../controllers/reviewController");
const rfqController = require("./../controllers/rfqController");
const searchController = require("./../controllers/searchQueryController");
const articleController = require("./../controllers/articleController");
const bannerController = require("./../controllers/bannerController");
const testimonialController = require("./../controllers/testimonialsController");
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authController.protect);
router.use(authController.restrictTo("admin"));

router.route("/").get((req, res) => {
	res.send("Hello");
});

router.route("/order").get(orderController.getAllOrders);

router
	.route("/order/:id")
	.patch(orderController.updateOrderStatus)
	.delete(orderController.deleteOrder);

router
	.route("/user")
	.get(userController.getAllUsers)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

router
	.route("/subcategory")
	.get(subcategoryController.allSubCategory)
	.post(subcategoryController.createSubCategory);
router
	.route("/subcategory/:id")
	.patch(subcategoryController.updateSubCategoryType)
	.delete(subcategoryController.deleteSubCategoryType);

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

router.route("/review").get(reviewController.getAllReviews);
router
	.route("/review/:id")
	.patch(reviewController.updateReview)
	.delete(reviewController.deleteReview);

router.route("/review/accept/:id").patch(reviewController.acceptReview);

router.route("/rfq").get(rfqController.getAllRFQs);
router
	.route("/rfq/:id")
	.patch(rfqController.updateRFQ)
	.delete(rfqController.deleteRFQ);

router.route("/search").get(searchController.getAllSearchQueries);

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

router
	.route("/testimonial")
	.get(testimonialController.getAllTestimonial)
	.post(testimonialController.createTestimonial);
router
	.route("/testimonial/:id")
	.patch(testimonialController.updateTestimonial)
	.delete(testimonialController.deleteTestimonial);

module.exports = router;
