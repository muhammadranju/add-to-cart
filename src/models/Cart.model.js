const { Schema, model } = require("mongoose");

const addTOcartSchema = new Schema(
  {
    // user: { type: String },

    // // cart: [
    // //   {
    // productId: {
    //   type: String,
    // },
    // productTitle: {
    //   type: String,
    // },
    // productPrice: {
    //   type: Number,
    // },
    // productImage: {
    //   type: String,
    // },
    // quantity: {
    //   type: Number,
    // },
    // //   },
    // // ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity can not be less then 1."],
            default: 1,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Cart = model("Cart", addTOcartSchema);

module.exports = Cart;
