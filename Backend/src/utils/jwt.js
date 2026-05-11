const jwt = require("jsonwebtoken");
const env = require("../config/env");

function signToken(user) {
  return jwt.sign({ id: user.id || user._id?.toString(), email: user.email, name: user.name }, env.jwtSecret, { expiresIn: "7d" });
}

module.exports = { signToken };
