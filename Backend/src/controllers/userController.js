const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("name email avatar reportHistory medicineHistory createdAt");
  return sendSuccess(res, "User profile fetched", user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { ...(name ? { name } : {}), ...(avatar ? { avatar } : {}) } },
    { new: true }
  ).select("name email avatar reportHistory medicineHistory createdAt");

  return sendSuccess(res, "Profile updated", user);
});

module.exports = { getProfile, updateProfile };
