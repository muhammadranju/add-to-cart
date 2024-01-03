const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const middleware = [
  express.json({ limit: "16kb" }),
  express.urlencoded({ extended: true, limit: "16kb" }),
  morgan("dev"),
  cookieParser(),
];

module.exports = middleware;
