const router = require("express").Router();

router.route("/product/:productID").get();
router.route("/product").get();

router.route("/product").post();
router.route("/product").patch();
router.route("/product").delete();

module.exports = router;
