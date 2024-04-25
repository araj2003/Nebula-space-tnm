const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const testimonialsController = require("../controllers/testimonialsController");
const bannerController = require("../controllers/bannerController");

router.get("/articles", articleController.getAllArticle);
router.get("/articles/top", articleController.getTopFiveArticles);
router.get("/articles/:id", articleController.getArticle);

router.get("/testimonials", testimonialsController.getAllTestimonial);

router.get("/banner/big", bannerController.getBigBanner);
router.get("/banner/small", bannerController.getSmallBanner);

module.exports = router;
