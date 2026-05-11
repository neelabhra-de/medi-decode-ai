const express = require("express");
const auth = require("../middleware/auth");
const { getReports, getMedicines } = require("../controllers/historyController");

const router = express.Router();
router.get("/reports", auth, getReports);
router.get("/medicines", auth, getMedicines);

module.exports = router;
