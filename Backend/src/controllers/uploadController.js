const mongoose = require("mongoose");
const Report = require("../models/Report");
const MedicineScan = require("../models/MedicineScan");
const { reports, medicines } = require("../data/memoryStore");
const { summarizeMedicalText } = require("../services/geminiService");

const mongoOn = () => mongoose.connection.readyState === 1;

async function uploadReport(req, res) {
  const fileName = req.file?.originalname || "report.pdf";
  const summary = await summarizeMedicalText(`Analyze report file: ${fileName}`, "report");
  const row = { userId: req.user.id, fileName, summary, risk: "moderate", createdAt: new Date().toISOString() };

  if (mongoOn()) {
    const saved = await Report.create(row);
    return res.status(201).json(saved);
  }

  row.id = String(Date.now());
  reports.unshift(row);
  return res.status(201).json(row);
}

async function uploadMedicine(req, res) {
  const fileName = req.file?.originalname || "medicine.jpg";
  const ai = await summarizeMedicalText(`Analyze medicine label file: ${fileName}`, "medicine");
  const row = {
    userId: req.user.id,
    fileName,
    medicineName: "Amoxicillin 500mg",
    dosage: "1 capsule every 8 hours",
    sideEffects: ["Nausea", "Mild rash", "Stomach discomfort"],
    precautions: ["Complete full course", "Avoid alcohol", "Consult doctor if rash appears"],
    aiSummary: ai,
    createdAt: new Date().toISOString(),
  };

  if (mongoOn()) {
    const saved = await MedicineScan.create(row);
    return res.status(201).json(saved);
  }

  row.id = String(Date.now());
  medicines.unshift(row);
  return res.status(201).json(row);
}

module.exports = { uploadReport, uploadMedicine };
