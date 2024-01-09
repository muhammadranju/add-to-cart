const router = require("express").Router();

const isLogin = require("../middleware/isLogin.middleware");

const {
  userLoginGetController,
  userRegisterGetController,
  userLoginPostController,
  userRegisterPostController,
} = require("../controllers/user.controller");

router.route("/login").get(isLogin, userLoginGetController);
router.route("/login").post(isLogin, userLoginPostController);

router.route("/register").get(isLogin, userRegisterGetController);
router.route("/register").post(isLogin, userRegisterPostController);

module.exports = router;
