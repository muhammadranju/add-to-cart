const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLoginGetController = async (req, res, next) => {};
const userLoginPostController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(200).json({ error: "All field are required" });
    }

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(200).json({ error: "Invalid email or password" });
    }

    const payload = {
      id: findUser._id,
      username: findUser.username,
      fullName: findUser?.full_name,
      email: findUser.email,
    };

    const token = await jwt.sign(
      payload,
      "mnfjdn56kndf%*(#&%&$df5d7dsfjksdhnfsdfjhsdf4hs41f"
    );

    const matchPassword = await bcrypt.compare(password, findUser.password);
    if (!matchPassword) {
      return res.status(200).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

const userRegisterGetController = async (req, res, next) => {};
const userRegisterPostController = async (req, res, next) => {
  try {
    const { username, full_name, email, password } = req.body;

    if ((!username, !email, !password)) {
      return res.status(400).json({ error: "All fields are required" });
    }
    console.log(req.body);
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json({ error: "this email already exits" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      full_name,
      email,
      password: hashPassword,
    });
    return res
      .status(201)
      .json({ data: user, message: "User create successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLoginGetController,
  userLoginPostController,
  userRegisterGetController,
  userRegisterPostController,
};
