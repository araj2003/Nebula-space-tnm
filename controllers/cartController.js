const CartItem = require("../models/cartItemModel");
const User = require("../models/userModel");
const factory = require("./handleFactory");
const catchAsyncErrors = require("./../utils/catchAsyncError");
const AppError = require("./../utils/appError");

//Add items to cart
exports.addItemToCart = catchAsyncErrors(async (req, res, next) => {
	try {
		const { productid, quantity, size, color, other } = req.body;

		// console.log(req.body);

		if (!productid) {
			return next(new AppError("Please provide product id", 400));
		}

		//check if product is already in cart
		// const product = await CartItem.findOne({
		// 	product: productid,
		// });
		const cart = await User.findById(req.user._id).select("cart").populate({
			path: "cart",
		});
		// const product = cart.cart.find((item) => item.product._id == productid);
		//also compare colour size and other
		// console.log(cart.cart);
		const product = cart.cart.find(
			(item) =>
				item.product._id == productid &&
				item.size === (size || "NaN") &&
				item.color === (color || "NaN") &&
				item.other === (other || "NaN")
		);
		// increase quantity if product is already in cart
		if (product) {
			// console.log("product already in cart");
			product.quantity += quantity || 1;
			await product.save();
			return res.status(201).json({
				success: true,
				cart: product,
			});
		}
		// console.log("product not in cart");
		// if (product) {
		// 	return next(new AppError("Product already in cart", 400));
		// }

		const cartItem = await CartItem.create({
			product: productid,
			quantity: quantity || 1,
			size: size || "NaN",
			color: color || "NaN",
			other: other || "NaN",
			user: req.user._id,
		});

		// console.log(cartItem);

		//add cart item to user
		const user = await User.findById(req.user._id);
		user.cart.push(cartItem._id);
		await user.save({ validateBeforeSave: false });

		res.status(201).json({
			success: true,
			cart: cartItem,
		});
	} catch (error) {
		next(error);
	}
});

//get my cart Items
exports.getAllMyCartItems = catchAsyncErrors(async (req, res, next) => {
	const cart = await User.findById(req.user._id)
		.select("cart")
		.populate({
			path: "cart",
			populate: {
				path: "product",
				select: "name images",
			},
		});
	// console.log(cart);
	res.status(200).json({
		success: true,
		cart: cart.cart,
	});
});

exports.getAllCartItems = factory.getAll(CartItem);
exports.getMyCartItem = factory.getOne(CartItem);
exports.updateCartItem = factory.updateOne(CartItem);
exports.deleteCartItem = factory.deleteOne(CartItem);
