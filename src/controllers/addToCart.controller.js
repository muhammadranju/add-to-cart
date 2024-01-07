const Cart = require("../models/Cart.model");
const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");

const addToCartGetController = async (req, res, next) => {
  const carts = await Cart.find({ owner: req.user?._id });

  const userCart = carts[0]?.items.map((item) => item);

  if (carts.length === 0) {
    return res.status(400).json({ message: "cart not found" });
  }
  return res.render("pages/addTOcart", { userCart });
};

const addToCartPostController = asyncHandler(async (req, res, next) => {
  try {
    const owner = req.user?._id;
    const { productId, productPrice, productTitle, productImage } = req.body;
    const { quantity = 1 } = req.body;

    const cart = await Cart.findOne({ owner });

    if (!cart) {
      const newCart = new Cart({
        productId,
        quantity,
        productPrice,
        productTitle,
        productImage,
        owner,
      });

      newCart.items.push({
        productId,
        quantity,
        productPrice,
        productTitle,
        productImage,
        owner,
      });
      await newCart.save();

      return res.redirect(`/api/v1/products/product/${productId}`);
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
    // console.log(addedProduct.productPrice * addedProduct.quantity);

    if (addedProduct) {
      // If product already exist assign a new quantity to it
      // ! We are not adding or subtracting quantity to keep it dynamic. Frontend will send us updated quantity here
      addedProduct.quantity = parseFloat(addedProduct.quantity) + quantity;
      addedProduct.productPrice =
        parseFloat(addedProduct.quantity) * productPrice;
      // if user updates the cart remove the coupon associated with the cart to avoid misuse
      // Do this only if quantity changes because if user adds a new project the cart total will increase anyways
    } else {
      // if its a new product being added in the cart push it to the cart items
      cart.items.push({
        productId,
        quantity,
        productPrice,
        productTitle,
        productImage,
        owner,
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
