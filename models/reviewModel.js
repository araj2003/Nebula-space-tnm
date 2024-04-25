const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Review: { type: String, required: true },
  Rating: { type: Number, required: true },
  name: { type: String, required: true },
  designation: { type: String },
  country: { type: String },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: ObjectId,
    ref: "Product",
    required: true,
  },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Review", reviewSchema);
