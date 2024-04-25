const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    img: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: Object,
    },
    author: { type: String },
    readTime: { type: String },
    authorPic : {type : String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", addressSchema);
