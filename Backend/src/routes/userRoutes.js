const express = require("express");
const auth = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { getProfile, updateProfile } = require("../controllers/userController");
const { updateProfileValidator } = require("../validators/userValidator");

const router = express.Router();

router.get("/profile", auth, getProfile);
router.put("/update-profile", auth, updateProfileValidator, validateRequest, updateProfile);

module.exports = router;
