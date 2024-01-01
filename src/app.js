const path = require("path");
const express = require("express");
const morgan = require("morgan");
const AddToCart = require("./models/addToCart.model");
const Product = require("./models/product.model");

const routes = require("./routes");
const app = express();
app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  morgan("dev"),
]);

app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));
app.use(express.static(path.resolve("src/public")));

app.use(routes);

app.get("/", async (req, res, next) => {
  const products = await Product.find();
  return res.render("pages/index", { products });
});
app.get("/add-to-cart", async (req, res, next) => {
  const carts = await AddToCart.find();
  console.log(carts);
  return res.render("pages/addTOcart", { carts });
});

app.post("/product", async (req, res) => {
  try {
    const { title, price, image, stocks } = req.body;

    if ((!title, !price, !image, !stocks)) {
      return res.status(400).json("All fields are required! ");
    }
    console.log(req.body);
    const product = new Product({
      title,
      price,
      image,
      stocks,
    });
    await product.save();

    return res.status(201).json(product);
  } catch (error) {
    console.log(error);
  }
});

app.post("/add-to-cart", async (req, res) => {
  try {
    const user = "658e5e825e645e8af6037489";
    const { productId, productTitle, productPrice, quantity = 1 } = req.body;

    const findUser = await AddToCart.findOne({ user });

    //   //   if (productId === findUser?.productId) {
    //   //     findUser.quantity = quantity + findUser.quantity;

    //   //     findUser.productPrice =
    //   //       parseFloat(productPrice) * parseFloat(findUser.quantity);

    //   //     return await findUser.save();
    //   //   }

    //   findUser.forEach(async (product) => {
    //     if (productId === product?.productId) {
    //       product.quantity = quantity + product.quantity;

    //       product.productPrice =
    //         parseFloat(productPrice) * parseFloat(product.quantity);

    //       return await product.save();
    //     }
    //   });
    //   if (productId === findUser?.productId) {
    //     console.log("ok");
    //   }

    const addCart = new AddToCart({
      productId,
      user,
      productTitle,
      productPrice: parseFloat(productPrice),
      quantity,
    });

    await addCart.save();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
module.exports = app;
