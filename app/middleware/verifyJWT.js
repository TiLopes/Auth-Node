const jwt = require("jsonwebtoken");
const User = require("../models/").User;
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        return res.status(403).json({ error: "Token is invalid" });
      }
      const user = await User.findOne({ where: { authToken: token } });
      if (!user) {
        return res.status(401).json({ error: "Invalid user token" });
      }

      next();
    }
  );
};

module.exports = verifyJWT;
