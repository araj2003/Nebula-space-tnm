const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	shippingInfo: {
		type: mongoose.Schema.ObjectId,
		ref: "Address",
		required: true,
	},
	billingInfo: {
		type: mongoose.Schema.ObjectId,
		ref: "Address",
		required: true,
	},
	orderItems: {
		type: [mongoose.Schema.ObjectId],
		ref: "CartItem",
		required: true,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	orderedAt: {
		type: Date,
		required: true,
	},
	orderStatus: {
		type: String,
		required: true,
		default: "Processing",
		enum: ["Processing", "Shipped", "Delivered"],
	},
	deliveredAt: Date,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Order", orderSchema);
