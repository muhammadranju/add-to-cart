const path = require("path");
const express = require("express");

const routes = require("./routes");
const middleware = require("./middleware/global.middleware");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));
app.use(express.static(path.resolve("src/public")));

app.use(routes);
app.use(middleware);

module.exports = app;
