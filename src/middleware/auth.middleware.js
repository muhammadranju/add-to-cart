const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");

const verifyJWTToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodeToken._id).select("-password");
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    res.redirect("/api/v1/user/login");
  }
};

module.exports = verifyJWTToken;
