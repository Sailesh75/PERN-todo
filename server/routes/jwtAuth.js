const express = require("express");
const router = express.Router();
const { User } = require("../models");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcryptjs");

//user register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUSer = await User.create({ username, email, password });
    // res.status(200).json(newUSer);
    //generate jwt token
    const token = jwtGenerator(newUSer);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ msg: "User doesn't exist!" });
    }
    //Method from User model to comparePassword
    const isPasswordCorrect = await User.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
    //else give user the token
    const token = jwtGenerator(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
