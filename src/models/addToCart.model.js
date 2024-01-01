const { Schema, model } = require("mongoose");

const addTOcartSchema = new Schema(
  {
    user: { type: String },

    cart: [
      {
        productId: {
          type: String,
        },
        productTitle: {
          type: String,
        },
        productPrice: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const AddToCart = model("AddToCart", addTOcartSchema);

module.exports = AddToCart;
