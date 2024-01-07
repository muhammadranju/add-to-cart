const router = require("express").Router();

const cartRoute = require("./cart.routes");
const productRoute = require("./product.routes");
const userRoute = require("./user.routes");

router.use("/api/v1/add-to-cart", cartRoute);
router.use("/api/v1/products", productRoute);
router.use("/api/v1/user", userRoute);

module.exports = router;
