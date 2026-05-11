const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    fileName: { type: String, required: true },
    summary: { type: String, required: true },
    risk: { type: String, default: "moderate" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Report || mongoose.model("Report", reportSchema);
