const router = require("express").Router();

const {
  userLoginGetController,
  userRegisterGetController,
  userLoginPostController,
  userRegisterPostController,
} = require("../controllers/user.controller");

router.route("/login").get(userLoginGetController);
router.route("/login").post(userLoginPostController);

router.route("/register").get(userRegisterGetController);
router.route("/register").post(userRegisterPostController);

module.exports = router;
