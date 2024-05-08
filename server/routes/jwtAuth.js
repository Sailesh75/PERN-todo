const express = require("express");
const router = express.Router();
const { User } = require("../models");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorize = require("../middleware/auth");

//user register
router.post("/register", validInfo, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists. Please try a different email.",
      });
    }
    const newUSer = await User.create({ username, email, password });
    //generate jwt token
    const token = jwtGenerator(newUSer);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//user login
router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Input email:", email);
    console.log("Input password:", password);
    const user = await User.findOne({ where: { email } });
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "Bad request: User doesn't exist!" });
    }
    //Method from User model to comparePassword
    const isPasswordCorrect = await User.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ msg: "Unauthorized: Invalid email or password" });
    }
    //else give user the token
    const token = jwtGenerator(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//verify the token
router.get("/verify", authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
