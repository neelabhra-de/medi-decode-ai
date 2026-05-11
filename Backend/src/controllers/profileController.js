const mongoose = require("mongoose");
const User = require("../models/User");
const { users } = require("../data/memoryStore");

const mongoOn = () => mongoose.connection.readyState === 1;

async function getProfile(req, res) {
  if (mongoOn()) {
    const user = await User.findById(req.user.id).select("name email createdAt");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  }

  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ id: user.id, name: user.name, email: user.email });
}

module.exports = { getProfile };
