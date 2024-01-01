const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      //   required: true,
    },
    price: {
      type: Number,
      trim: true,
      //   required: true,
    },
    image: {
      type: String,
      trim: true,
      //   required: true,
    },
    stocks: {
      type: Number,
      trim: true,
      //   required: true,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

module.exports = Product;
