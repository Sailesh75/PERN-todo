require("dotenv").config;
const passport = require("passport");
const { User } = require("../models");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const { id, displayName, emails } = profile;
        const email = emails[0].value;
        let user = await User.findOne({ where: { email } });

        if (!user) {
          user = await User.create({
            username: displayName,
            email: email,
            googleId: id,
            password: " ",
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Error in Google strategy:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
