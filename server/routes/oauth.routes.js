const express = require("express");
const router = express.Router();
const {
  googleAuth,
  googleCallback,
  handleGoogleCallback,
} = require("../controllers/oauth.controller");

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback, handleGoogleCallback);

module.exports = router;
