const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

router.post("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectUrl = "http://127.0.0.1:3000/oauth";

  const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

  const authorizeUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});

module.exports = router;
