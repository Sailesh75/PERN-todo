const passport = require("passport");
const jwtGenerator = require("../utils/jwtGenerator");

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

const googleCallback = passport.authenticate("google", {
  failureRedirect: "/",
  session: false,
});

const handleGoogleCallback = async (req, res) => {
  try {
    const user = req.user;
    const token = jwtGenerator(user);

    if (!token) {
      return res.status(400).json("Error while creating JWT token");
    }

    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error("Error handling Google callback:", error);
    res.redirect("/");
  }
};

module.exports = {
  googleAuth,
  googleCallback,
  handleGoogleCallback,
};
