const express = require("express");
const auth = require("../middleware/auth");
const { chatWithReport } = require("../controllers/chatController");

const router = express.Router();
router.post("/report", auth, chatWithReport);

module.exports = router;
