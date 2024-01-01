const AddToCart = require("../models/addToCart.model");

const addToCartGetController = async (req, res, next) => {
  const carts = await AddToCart.find();
  console.log(carts);
  return res.render("pages/addTOcart", { carts });
};

module.exports = { addToCartGetController };
