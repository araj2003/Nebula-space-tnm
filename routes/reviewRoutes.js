const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router.post('/', reviewController.addInfo, reviewController.createReview);
router.get(
	'/:productid',
	reviewController.addInfo,
	reviewController.getmyReviewForProduct
);

router
	.route('/:id')
	.patch(reviewController.updateReview)
	.delete(reviewController.deleteReview);

router.use(authController.restrictTo('admin'));
router.get('/', reviewController.getAllReviews);
router.get(
	'/:productid',
	reviewController.addInfo,
	reviewController.getAllReviewsForProduct
);
module.exports = router;
