const router = require("express").Router();
const Authorization = require("../middleware/auth.middleware");
const {
  addToCartGetController,
  addToCartPostController,
} = require("../controllers/addToCart.controller");

router.route("/").get(Authorization, addToCartGetController);

router.route("/").post(Authorization, addToCartPostController);

module.exports = router;
