const jwt = require("jsonwebtoken");
const env = require("../config/env");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  try {
    const bearer = req.headers.authorization || "";
    const token = req.cookies?.token || (bearer.startsWith("Bearer ") ? bearer.slice(7) : null);
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized", data: null });

    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id).select("_id name email avatar");
    if (!user) return res.status(401).json({ success: false, message: "Invalid token user", data: null });

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized", data: err.message });
  }
}

module.exports = authMiddleware;
