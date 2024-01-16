const router = require("express").Router();
const { ApiVersion } = require("../constants");
const cartRoute = require("./cart.routes");
const productRoute = require("./product.routes");
const userRoute = require("./user.routes");

router.use(`${ApiVersion}/add-to-cart`, cartRoute);
router.use(`${ApiVersion}/products`, productRoute);
router.use(`${ApiVersion}/`, userRoute);

module.exports = router;
