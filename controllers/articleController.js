const Articles = require("../models/articleModel");
const factory = require("./handleFactory");
const catchAsyncError = require("../utils/catchAsyncError");

exports.getAllArticle = catchAsyncError(async (req, res, next) => {
	let filter = {};
	if (req.params.tourId) filter = { tour: req.params.tourId };

	// Extract page and limit from query parameters or use default values
	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 5; // Default limit: 5

	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	// Fetch articles based on pagination
	const articlesQuery = Articles.find(filter)
    .sort({ updatedAt: -1 })
    .skip(startIndex)
    .limit(limit);
	const articles = await articlesQuery;

	// Get total count for pagination calculation
	const totalDocuments = await Articles.countDocuments(filter);

	// Pagination result
	const pagination = {};

	if (endIndex < totalDocuments) {
		pagination.next = {
			page: page + 1,
			limit: limit,
		};
	}

	if (startIndex > 0) {
		pagination.prev = {
			page: page - 1,
			limit: limit,
		};
	}

	// SEND RESPONSE
	res.status(200).json({
		status: "success",
		results: articles.length,
		totalDocuments: totalDocuments,
		pagination: pagination,
		data: {
			data: articles,
		},
	});
});
exports.getAllArticleAdmin = factory.getAll(Articles);

exports.createArticle = factory.createOne(Articles);
exports.updateArticle = catchAsyncError(async (req, res, next) => {
	//replace &lt; with < in req.body.content string
	if (req.body?.content)
		req.body.content = req.body.content.replace(/&lt;/g, "<");
	// console.log(req.body);

	const doc = await Articles.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!doc) {
		return next(new AppError("No document found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			data: doc,
		},
	});
});
exports.deleteArticle = factory.deleteOne(Articles);
exports.getArticle = (req, res) => {
	Articles.findById(req.params.id)
		.then((article) => res.json(article))
		.catch((err) => res.status(400).json("Error: " + err));
};
//get latest top 5 articles
exports.getTopFiveArticles = (req, res) => {
	Articles.find()
		.sort({ updatedAt: -1 })
		.limit(5)
		.then((articles) => res.json(articles))
		.catch((err) => res.status(400).json("Error: " + err));
};
