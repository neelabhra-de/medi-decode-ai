const express = require("express");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { uploadReport, reportHistory, getReportById, deleteReport } = require("../controllers/reportController");
const { reportUploadValidator, idParamValidator } = require("../validators/reportValidator");

const router = express.Router();

router.post("/upload", auth, upload.single("file"), reportUploadValidator, validateRequest, uploadReport);
router.get("/history", auth, reportHistory);
router.get("/:id", auth, idParamValidator, validateRequest, getReportById);
router.delete("/:id", auth, idParamValidator, validateRequest, deleteReport);

module.exports = router;
