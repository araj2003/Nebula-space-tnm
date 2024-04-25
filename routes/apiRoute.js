const express = require("express");
const router = express.Router();
const AppError = require("../utils/appError");
const user = require("./userRoutes");
const product = require("./productsRoute");
const order = require("./orderRoutes");
const review = require("./reviewRoutes");
const cart = require("./cartRoutes");
const rfq = require("./rfqRoutes");
const search = require("./searchQueryRoutes");
const category = require("./categoryRoutes");
const admin = require("./adminRoute");
const editor = require("./editorRoute");
const content = require("./contentRoute");
const home = require("./homeRoute");
const ErrorHandler = require("../utils/appError");
// const varieties = require("./varietyRoutes");
// const healthCheck = require("./healthCheckRoutes");

router.use("/user", user);
router.use("/category", category);
router.use("/product", product);
router.use("/review", review);
router.use("/order", order);
router.use("/rfq", rfq);
router.use("/searchquery", search);
router.use("/cart", cart);
router.use("/home", home);
router.use("/admin", admin);
router.use("/editor", editor);
router.use("/content", content);
router.get("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = router;
