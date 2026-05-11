const Report = require("../models/Report");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const { analyzeMedicalReport } = require("../services/geminiService");

const uploadReport = asyncHandler(async (req, res) => {
  if (!req.file) return sendError(res, "Report file is required", 400);

  const extractedText = req.body.extractedText || `Uploaded report: ${req.file.originalname}`;
  const ai = await analyzeMedicalReport(extractedText);

  const report = await Report.create({
    userId: req.user._id,
    originalFile: req.file.originalname,
    extractedText,
    aiSummary: ai.data?.summary || "Report analyzed",
    abnormalParameters: ai.data?.abnormalParameters || [],
  });

  await User.findByIdAndUpdate(req.user._id, { $push: { reportHistory: report._id } });
  return sendSuccess(res, "Report uploaded and analyzed", { report, ai }, 201);
});

const reportHistory = asyncHandler(async (req, res) => {
  const reports = await Report.find({ userId: req.user._id }).sort({ uploadedAt: -1 });
  return sendSuccess(res, "Report history fetched", reports);
});

const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findOne({ _id: req.params.id, userId: req.user._id });
  if (!report) return sendError(res, "Report not found", 404);
  return sendSuccess(res, "Report fetched", report);
});

const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!report) return sendError(res, "Report not found", 404);
  await User.findByIdAndUpdate(req.user._id, { $pull: { reportHistory: report._id } });
  return sendSuccess(res, "Report deleted", report);
});

module.exports = { uploadReport, reportHistory, getReportById, deleteReport };
