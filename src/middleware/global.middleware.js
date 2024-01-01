const express = require("express");
const morgan = require("morgan");

const middleware = [
  express.json(),
  express.urlencoded({ extended: true }),
  morgan("dev"),
];

module.exports = middleware;
