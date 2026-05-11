const express = require("express");
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { scanMedicine, medicineHistory, getMedicineById } = require("../controllers/medicineController");
const { medicineScanValidator } = require("../validators/medicineValidator");
const { idParamValidator } = require("../validators/reportValidator");

const router = express.Router();

router.post("/scan", auth, upload.single("file"), medicineScanValidator, validateRequest, scanMedicine);
router.get("/history", auth, medicineHistory);
router.get("/:id", auth, idParamValidator, validateRequest, getMedicineById);

module.exports = router;
