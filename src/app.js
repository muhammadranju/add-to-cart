const path = require("path");
const express = require("express");

const routes = require("./routes");
const middleware = require("./middleware/global.middleware");
const { notFoundHandler, errorHandler } = require("./common/commonController");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));
app.use(express.static(path.resolve("src/public")));

app.get("/", (req, res) => {
  return res.status(200).redirect("/api/v1/products");
});
app.use(middleware);
app.use(routes);

app.use(notFoundHandler, errorHandler);

module.exports = app;
