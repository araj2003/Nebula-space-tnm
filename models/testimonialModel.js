const mongoose = require("mongoose");

const testimonial = mongoose.Schema({
	Rating: { type: Number },
	name: { type: String },
	review: { type: String },
	designation: { type: String },
	image: { type: String },
});

module.exports = mongoose.model("testimonial", testimonial);
