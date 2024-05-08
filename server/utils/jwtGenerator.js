const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtGenerator = (user) => {
  const payload = {
    user: user.uuid,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

module.exports = jwtGenerator;
