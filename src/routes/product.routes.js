const router = require("express").Router();

const {
  allProductGetController,
} = require("../controllers/product.controller");

router.route("/product/:productID").get();
router.route("/").get(allProductGetController);

router.route("/product").post();
router.route("/product").patch();
router.route("/product").delete();

module.exports = router;
