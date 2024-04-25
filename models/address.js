const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	officialEmailId: {
		type: String,
	},
	organization: {
		type: String,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	pinCode: {
		type: Number,
		required: true,
	},
	phoneNo: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Address", addressSchema);
