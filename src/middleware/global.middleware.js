const express = require("express");
const morgan = require("morgan");

const middleware = [
  express.json({ limit: "16kb" }),
  express.urlencoded({ extended: true, limit: "16kb" }),
  morgan("dev"),
];

module.exports = middleware;
