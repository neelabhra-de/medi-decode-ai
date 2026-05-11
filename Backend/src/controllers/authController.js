const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/User");
const { users } = require("../data/memoryStore");
const { signToken } = require("../utils/jwt");

const mongoOn = () => mongoose.connection.readyState === 1;

async function signup(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "name, email, password required" });

  const passwordHash = await bcrypt.hash(password, 10);

  if (mongoOn()) {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already exists" });
    const user = await User.create({ name, email, passwordHash });
    const token = signToken(user);
    return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  }

  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(409).json({ message: "Email already exists" });
  const user = { id: String(Date.now()), name, email, passwordHash };
  users.push(user);
  const token = signToken(user);
  return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email and password required" });

  if (mongoOn()) {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user);
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  }

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = signToken(user);
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
}

module.exports = { signup, login };
