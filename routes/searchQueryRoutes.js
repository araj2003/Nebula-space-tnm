const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");

const searchController = require("../controllers/searchQueryController");
router.post("/", searchController.createSearchQuery);
router.use(authController.protect);
router.use(authController.restrictTo("admin"));
router.get("/", searchController.getAllSearchQueries);

module.exports = router;
