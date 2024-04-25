const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
	bigBanner: {
		type: [String],
	},
	smallBanner: {
		type: [String],
	},
});

module.exports = mongoose.model("Banner", addressSchema);
