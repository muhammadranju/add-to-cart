const Product = require("../models/product.model");

const allProductGetController = async (req, res, next) => {
  const products = await Product.find();
  return res.render("pages/index", { products });
};

module.exports = { allProductGetController };
