const jwt = require("jsonwebtoken");
function jwtVerifyToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

const isLogin = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    const user = jwtVerifyToken(token);
    if (user?.status) {
      return res.status(403).json({ error: "Return home" });
    }

    return next();
  } catch (error) {
    if (error.message === "jwt must be provided") {
      return next();
    }
    if (error.message.includes("invalid token")) {
      return res.status(403).json({
        error: "you don't have access to change it.",
        message: error.message,
      });
    }
    if (error.message.includes("invalid signature")) {
      return res.status(403).json({
        error: "you don't have access to change it.",
        message: error.message,
      });
    }
    if (error.message.includes("Unexpected", "token", "end", "input")) {
      return res.status(403).json({
        error: "you don't have access to change it.",
        message: error.message,
      });
    }
    if (error.message.includes("jwt malformed")) {
      return res.status(403).json({
        error: "you don't have access to change it.",
        message: error.message,
      });
    }
    if (error.message.includes("jwt expired")) {
      return next();
    }
    return next();
  }
};

module.exports = isLogin;
