const Review = require("./../models/reviewModel");
const Product = require("./../models/myProductModel");
const catchAsyncErrors = require("./../utils/catchAsyncError");
const factory = require("./handleFactory");

// post a review by user

exports.addInfo = (req, res, next) => {
	if (!req.body.product) req.body.product = req.params.productid;
	if (!req.body.user) req.body.user = req.user.id;
	next();
};

exports.getmyReviewForProduct = catchAsyncErrors(async (req, res, next) => {
	const result = await Review.find({
		product: req.body.product,
		user: req.user.id,
	});

	res.status(200).json({
		message: "success",
		result,
	});
});
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.getAllReviews = factory.getAll(Review);
exports.acceptReview = catchAsyncErrors(async (req, res, next) => {
	try {
		const result = await Review.findByIdAndUpdate(req.params.id, {
			accepted: true,
		});
		// console.log(result);
		if (!result) return next(new AppError("No review found with that ID", 404));

		const product = await Product.findById(result.product);
		if (!product)
			return next(new AppError("No product found with that ID", 404));
		product.total_no_of_reviews += 1;
		product.avg_rating =
			(product.avg_rating * (product.total_no_of_reviews - 1) + result.Rating) /
			product.total_no_of_reviews;
		product.avg_rating = Math.round(product.avg_rating * 10) / 10;
		product.reviews.push(result);
		await product.save();

		//delete the review from the database
		await Review.findByIdAndDelete(req.params.id);

		res.status(200).json({
			success: true,
			message: "Review accepted successfully",
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			success: false,
			message: "Something went wrong",
		});
	}
});

exports.getAllReviewsForProduct = catchAsyncErrors(async (req, res, next) => {
	const result = await Review.find({
		product: req.body.product,
	});

	res.status(200).json({
		message: "success",
		result,
	});
});

// get review by user and product
