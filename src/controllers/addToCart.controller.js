const Cart = require("../models/Cart.model");
const asyncHandler = require("../utils/asyncHandler");

const addToCartGetController = async (req, res, next) => {
  const carts = await Cart.find();
  return res.render("pages/addTOcart", { carts });
};

const addToCartPostController = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const {
      productId,
      productTitle,
      productPrice,
      productImage,
      quantity = 1,
    } = req.body;

    const cartProduct = await Cart.find({ user: userId });

    cartProduct.forEach((items) => {
      console.log(productId === items.productId);
      if (productId === items.productId) {
        items.quantity = quantity + cartProduct?.quantity;
        items.productPrice =
          parseFloat(productPrice) * parseFloat(cartProduct?.quantity);
        // cartProduct.save()
      }
      console.log(cartProduct);
    });
    // findUser.quantity = quantity + findUser?.quantity;
    // findUser.productPrice =
    //   parseFloat(productPrice) * parseFloat(findUser?.quantity);
    // findUser.save();

    // if (user) {
    //   if (productId !== findUser?.productId) {
    //     const cart = new Cart({
    //       user,
    //       productId,
    //       productTitle,
    //       productPrice,
    //       productImage,
    //       quantity,
    //     });
    //     // await cart.save();
    //     return res.redirect(`/api/v1/products/product/${productId}`);
    //   }
    // }

    // console.log(cart);
    //   //   if (productId === findUser?.productId) {
    //   //     findUser.quantity = quantity + findUser.quantity;

    //   //     findUser.productPrice =
    //   //       parseFloat(productPrice) * parseFloat(findUser.quantity);

    //   //     return await findUser.save();
    //   //   }

    //   findUser.forEach(async (product) => {
    //     if (productId === product?.productId) {
    //       product.quantity = quantity + product.quantity;

    //       product.productPrice =
    //         parseFloat(productPrice) * parseFloat(product.quantity);

    //       return await product.save();
    //     }
    //   });
    //   if (productId === findUser?.productId) {
    //     console.log("ok");
    //   }

    // const addCart = new AddToCart({
    //   productId,
    //   // user,
    //   productTitle,
    //   productPrice: parseFloat(productPrice),
    //   quantity,
    // });

    // await cart.save();

    return res.redirect(`/api/v1/products/product/${productId}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = { addToCartGetController, addToCartPostController };
