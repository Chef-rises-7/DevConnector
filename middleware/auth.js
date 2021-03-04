const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token, authorization denied" });
  }

  try {
    const decode = await jwt.verify(token, config.get("jwtToken"));
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
