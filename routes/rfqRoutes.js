const express = require("express");
const router = express.Router();
const rfqController = require("../controllers/rfqController");
const authController = require("../controllers/authController");

router.post("/", rfqController.createRFQ);
router.use(authController.protect);
router.use(authController.restrictTo("admin"));
router.get("/", rfqController.getAllRFQs);

module.exports = router;
