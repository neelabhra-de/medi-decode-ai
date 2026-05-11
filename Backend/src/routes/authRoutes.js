const express = require("express");
const { signup, login, logout, me } = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { signupValidator, loginValidator } = require("../validators/authValidator");

const router = express.Router();

router.post("/signup", signupValidator, validateRequest, signup);
router.post("/login", loginValidator, validateRequest, login);
router.post("/logout", auth, logout);
router.get("/me", auth, me);

module.exports = router;
