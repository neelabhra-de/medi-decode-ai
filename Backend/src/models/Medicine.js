const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    medicineName: { type: String, required: true },
    uploadedImage: { type: String, required: true },
    aiExplanation: { type: String, required: true },
    dosage: { type: String, default: "" },
    sideEffects: [{ type: String }],
    precautions: [{ type: String }],
    scannedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);
