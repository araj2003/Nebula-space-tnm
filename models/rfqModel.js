const mongoose = require("mongoose");

const rfqSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		companyName: {
			type: String,
		},
		address: {
			type: String,
		},
		phone: {
			type: String,
		},
		email: {
			type: String,
		},
		country: {
			type: String,
		},
		productDetails: {
			type: String,
		}, //rfq window
		message: {
			type: String,
		}, //Contact Us
		category: {
			type: String,
		}, //Catalog
	},
	{ timestamps: true }
);

module.exports = mongoose.model("RFQ", rfqSchema);
