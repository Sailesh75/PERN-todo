const express = require("express");
const router = express.Router();
const authorize = require("../middleware/auth");
const { User } = require("../models");

router.get("/", authorize, async (req, res) => {
  try {
    //req.user has the payload
    // res.json(req.user);
    const user = await User.findOne({ where: { uuid: req.user } });
    res.status(200).json({ username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
