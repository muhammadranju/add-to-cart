const AddToCart = require("../models/addToCart.model");

const addToCartGetController = async (req, res, next) => {
  const carts = await AddToCart.find();
  console.log(carts);
  return res.render("pages/addTOcart", { carts });
};

const addToCartPostController = async (req, res, next) => {
  try {
    const user = "658e5e825e645e8af6037489";
    const { productId, productTitle, productPrice, quantity = 1 } = req.body;

    const findUser = await AddToCart.findOne({ user });

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

    const addCart = new AddToCart({
      productId,
      user,
      productTitle,
      productPrice: parseFloat(productPrice),
      quantity,
    });

    await addCart.save();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addToCartGetController, addToCartPostController };
