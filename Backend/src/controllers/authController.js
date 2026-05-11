const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const { generateToken } = require("../utils/generateToken");

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return sendError(res, "Email already in use", 409);

  const user = await User.create({ name, email, password });
  const token = generateToken({ id: user._id, email: user.email });
  res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false, maxAge: 7 * 24 * 3600 * 1000 });

  return sendSuccess(res, "Signup successful", { token, user: { id: user._id, name: user.name, email: user.email } }, 201);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) return sendError(res, "Invalid credentials", 401);

  const valid = await user.comparePassword(password);
  if (!valid) return sendError(res, "Invalid credentials", 401);

  const token = generateToken({ id: user._id, email: user.email });
  res.cookie("token", token, { httpOnly: true, sameSite: "lax", secure: false, maxAge: 7 * 24 * 3600 * 1000 });

  return sendSuccess(res, "Login successful", { token, user: { id: user._id, name: user.name, email: user.email } });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  return sendSuccess(res, "Logout successful", null);
});

const me = asyncHandler(async (req, res) => sendSuccess(res, "Profile fetched", req.user));

module.exports = { signup, login, logout, me };
