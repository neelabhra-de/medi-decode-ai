const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { uploadReport, uploadMedicine } = require("../controllers/uploadController");

const router = express.Router();
router.post("/report", auth, upload.single("file"), uploadReport);
router.post("/medicine", auth, upload.single("file"), uploadMedicine);

module.exports = router;
