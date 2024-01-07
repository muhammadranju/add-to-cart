const Cart = require("../models/Cart.model");
const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");

const addToCartGetController = async (req, res, next) => {
  const carts = await Cart.find({ user: req.user?._id });

  if (carts.length === 0) {
    return res.status(400).json({ message: "cart not found" });
  }
  return res.render("pages/addTOcart", { carts });
};

const addToCartPostController = asyncHandler(async (req, res, next) => {
  try {
    const owner = req.user?._id;
    const { productId } = req.body;
    const { quantity = 1 } = req.body;

    const cart = await Cart.findOne({ owner: req.user._id });

    if (!cart) {
      const newCart = new Cart({ productId, quantity, owner });
      await newCart.save();
    }

    const product = await Product.findById(productId);

    if (!product) {
      throw new ApiError(404, "Product does not exist");
    }

    if (quantity > product.stocks) {
      // if quantity is greater throw an error
      throw new ApiError(
        400,
        product.stocks > 0
          ? "Only " +
            product.stocks +
            " products are remaining. But you are adding " +
            quantity
          : "Product is out of stock"
      );
    }

    // See if the product that user is adding already exists in the cart
    const addedProduct = cart.items?.find(
      (item) => item.productId.toString() === productId
    );

    if (addedProduct) {
      // If product already exist assign a new quantity to it
      // ! We are not adding or subtracting quantity to keep it dynamic. Frontend will send us updated quantity here
      addedProduct.quantity = parseFloat(quantity) + 1;
      // if user updates the cart remove the coupon associated with the cart to avoid misuse
      // Do this only if quantity changes because if user adds a new project the cart total will increase anyways
    } else {
      // if its a new product being added in the cart push it to the cart items
      cart.items.push({
        productId,
        quantity,
      });
    }

    // Finally save the cart
    await cart.save();

    return res.redirect(`/api/v1/products/product/${productId}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { addToCartGetController, addToCartPostController };
