const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      index: true,
    },
    price: {
      type: String,
      require: true,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    company: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
