const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const { OAuth2Client } = require("google-auth-library");
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  console.log("data", data);
}

router.get("/", async (req, res, next) => {
  const code = req.query.code;
  try {
    const redirectUrl = "http://127.0.0.1:3000/oauth";
    const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);
    const tokens = await oauth2Client.getToken(code);
    await oauth2Client.setCredentials(tokens);
    const user = oauth2Client.credentials;
    console.log("user", user);
    const userData = await getUserData(user.access_token);
    console.log("userData", userData);
    
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
