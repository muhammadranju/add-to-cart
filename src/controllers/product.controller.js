const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const allProductGetController = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  return res.render("pages/index", { products });
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const { productID } = req.params;
    if (!productID) {
      throw new ApiError(404, "this product is not available");
    }

    const product = await Product.findById({ _id: productID });
    if (!product) {
      throw new ApiError(404, "this product is not available");
    }
    return res.status(200).render("pages/product", { product });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { allProductGetController, getProductById };
