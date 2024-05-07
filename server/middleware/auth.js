const jwt = require("jsonwebtoken");
require("dotenv").config;

module.exports = async (req, res, next) => {
  console.log("i am inside middleware");
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not authorized!");
    }
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = payload.user;
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
  next();
};
