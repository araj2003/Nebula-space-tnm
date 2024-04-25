const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
	quantity: {
		type: Number,
		required: true,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	size: {
		type: String,
		default: "NaN",
	},
	color: {
		type: String,
		default: "NaN",
	},
	other: {
		type: String,
		default: "NaN",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("CartItem", cartItemSchema);
