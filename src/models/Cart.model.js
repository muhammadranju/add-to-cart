const { Schema, model } = require("mongoose");

const addTOcartSchema = new Schema(
  {
    user: { type: String },

    // cart: [
    //   {
    productId: {
      type: String,
    },
    productTitle: {
      type: String,
    },
    productPrice: {
      type: Number,
    },
    productImage: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    //   },
    // ],
  },
  { timestamps: true }
);

const Cart = model("Cart", addTOcartSchema);

module.exports = Cart;
