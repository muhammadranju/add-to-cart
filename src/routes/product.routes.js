const router = require("express").Router();

const Authorization = require("../middleware/auth.middleware");
const {
  allProductGetController,
  getProductById,
} = require("../controllers/product.controller");

router.route("/product/:productID").get(Authorization, getProductById);
router.route("/").get(allProductGetController);

router.route("/product").post();
router.route("/product").patch();
router.route("/product").delete();

module.exports = router;
