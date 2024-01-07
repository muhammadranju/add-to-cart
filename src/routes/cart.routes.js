const router = require("express").Router();
const Authorization = require("../middleware/auth.middleware");
const {
  addToCartGetController,
  addItemOrUpdateItemQuantity,
} = require("../controllers/cart.controller");

router.route("/").get(Authorization, addToCartGetController);

router.route("/").post(Authorization, addItemOrUpdateItemQuantity);

module.exports = router;
