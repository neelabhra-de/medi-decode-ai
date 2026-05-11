const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    originalFile: { type: String, required: true },
    extractedText: { type: String, default: "" },
    aiSummary: { type: String, required: true },
    abnormalParameters: [{ type: String }],
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Report || mongoose.model("Report", reportSchema);
