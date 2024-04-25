const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Category", categorySchema);
