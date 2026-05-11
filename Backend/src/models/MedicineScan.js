const mongoose = require("mongoose");

const medicineScanSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    fileName: { type: String, required: true },
    medicineName: { type: String, required: true },
    dosage: { type: String, required: true },
    sideEffects: { type: [String], default: [] },
    precautions: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.models.MedicineScan || mongoose.model("MedicineScan", medicineScanSchema);
