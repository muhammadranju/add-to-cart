const router = require("express").Router();

const {
  addToCartGetController,
  addToCartPostController,
} = require("../controllers/addToCart.controller");

router.route("/").get(addToCartGetController);

router.route("/").post(addToCartPostController);

module.exports = router;
