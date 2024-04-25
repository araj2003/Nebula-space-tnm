const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter the product name"],
		},
		// varities: {
		//   type: [{ variety: { type: String }, varietyvalue: { type: String } }],
		//   default: [],
		// },
		varities: { type: [String], default: [] },
		color: { type: [String], default: [] },
		available_size: { type: [String], default: [] },
		othervarients: { type: [String], default: [] },
		brand: { type: String, default: "VNM" },
		categories: {
			categoryids: { type: [ObjectId], ref: "Category" },
			subcategoryids: { type: [ObjectId], ref: "SubCategory" },
		},

		specifications: { type: String },
		model_number: { type: String, unique: true },
		productTitle: { type: String },
		description: {
			type: String,
		},
		specific_features: { type: [String] },
		material_used: { type: String },
		dimenssions: { type: [String] },
		weight_of_the_commodity: { type: [String] },
		value: { type: [String] },
		constraints: { type: String },
		caution: { type: [String] },
		shelflife: { type: String },
		guarantee_and_warranty: { type: String },
		mode_of_administration: {
			type: String,
		},
		conditions: { type: String },
		stage_of_animal_used: { type: String },
		dosage_recommended: { type: [String] },
		active_ingredients: { type: String },
		certification: { type: String },
		faqs: [
			{
				question: {
					type: String,
				},
				answer: {
					type: String,
				},
			},
		],
		avg_rating: { type: Number },
		total_no_of_reviews: {
			type: Number,
		},

		reviews: [
			{
				Title: { type: String },
				Review: { type: String },
				Rating: { type: Number },
				name: { type: String },
				designation: { type: String },
				country: { type: String },
				date: { type: String },
			},
		],
		images: { type: [String] },

		createdAt: {
			type: Date,
			default: Date.now,
		},
		onHomepage: {
			type: String,
			default: "none",
		},
	},
	{ minimize: false } // Retains empty objects and arrays in the document
);

module.exports = mongoose.model("Product", ProductSchema);
