const { Schema, model } = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");

const cartSchema = new Schema(
  {
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
          productPrice: {
            type: Number,
          },
          productTitle: {
            type: String,
          },
          productImage: {
            type: String,
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

cartSchema.plugin(mongooseAggregatePaginate);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
