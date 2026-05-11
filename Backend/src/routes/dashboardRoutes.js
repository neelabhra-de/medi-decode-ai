const express = require("express");
const auth = require("../middlewares/authMiddleware");
const { getDashboardOverview } = require("../controllers/dashboardController");

const router = express.Router();
router.get("/overview", auth, getDashboardOverview);

module.exports = router;
