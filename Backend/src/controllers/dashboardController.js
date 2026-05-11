const Report = require("../models/Report");
const Medicine = require("../models/Medicine");
const Chat = require("../models/Chat");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");

const getDashboardOverview = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [totalReports, totalMedicines, totalChats, recentReports, recentMedicines] = await Promise.all([
    Report.countDocuments({ userId }),
    Medicine.countDocuments({ userId }),
    Chat.countDocuments({ userId }),
    Report.find({ userId }).sort({ uploadedAt: -1 }).limit(5).select("originalFile aiSummary uploadedAt"),
    Medicine.find({ userId }).sort({ scannedAt: -1 }).limit(5).select("medicineName scannedAt"),
  ]);

  return sendSuccess(res, "Dashboard overview fetched", {
    totals: { totalReports, totalMedicines, totalChats },
    recentUploads: { reports: recentReports, medicines: recentMedicines },
    aiUsageSummary: {
      reportAnalyses: totalReports,
      medicineAnalyses: totalMedicines,
      reportChats: totalChats,
    },
  });
});

module.exports = { getDashboardOverview };
