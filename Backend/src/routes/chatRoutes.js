const express = require("express");
const auth = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { reportChat } = require("../controllers/chatController");
const { reportChatValidator } = require("../validators/chatValidator");

const router = express.Router();
router.post("/report-chat", auth, reportChatValidator, validateRequest, reportChat);

module.exports = router;
