const Medicine = require("../models/Medicine");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const { analyzeMedicine } = require("../services/geminiService");

const scanMedicine = asyncHandler(async (req, res) => {
  if (!req.file) return sendError(res, "Medicine image/report file is required", 400);

  const medicineName = req.body.medicineName || "Unknown medicine";
  const ocrText = req.body.ocrText || `Uploaded file: ${req.file.originalname}`;
  const ai = await analyzeMedicine({ medicineName, ocrText, imageText: "" });

  const medicine = await Medicine.create({
    userId: req.user._id,
    medicineName: ai.data?.medicineName || medicineName,
    uploadedImage: req.file.originalname,
    aiExplanation: ai.data?.purpose || "Awareness explanation generated",
    dosage: ai.data?.dosage || "Follow doctor instructions",
    sideEffects: ai.data?.sideEffects || [],
    precautions: ai.data?.precautions || [],
  });

  await User.findByIdAndUpdate(req.user._id, { $push: { medicineHistory: medicine._id } });
  return sendSuccess(res, "Medicine scanned and analyzed", { medicine, ai }, 201);
});

const medicineHistory = asyncHandler(async (req, res) => {
  const medicines = await Medicine.find({ userId: req.user._id }).sort({ scannedAt: -1 });
  return sendSuccess(res, "Medicine history fetched", medicines);
});

const getMedicineById = asyncHandler(async (req, res) => {
  const medicine = await Medicine.findOne({ _id: req.params.id, userId: req.user._id });
  if (!medicine) return sendError(res, "Medicine not found", 404);
  return sendSuccess(res, "Medicine fetched", medicine);
});

module.exports = { scanMedicine, medicineHistory, getMedicineById };
