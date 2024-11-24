const jwt = require("jsonwebtoken");
const authConfig = require("../configs/authConfig");

function authenticateJWT(req, res, next) {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, authConfig.jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
