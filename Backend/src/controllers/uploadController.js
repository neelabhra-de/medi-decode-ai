const mongoose = require("mongoose");
const Report = require("../models/Report");
const MedicineScan = require("../models/MedicineScan");
const { reports, medicines } = require("../data/memoryStore");
const { analyzeMedicalReport, analyzeMedicine } = require("../services/geminiService");

const mongoOn = () => mongoose.connection.readyState === 1;

async function uploadReport(req, res) {
  const fileName = req.file?.originalname || "report.pdf";
  const reportText = `Uploaded file name: ${fileName}`;
  const ai = await analyzeMedicalReport(reportText);

  const row = {
    userId: req.user.id,
    fileName,
    summary: ai?.data?.summary || "Report analyzed",
    risk: ai?.data?.abnormalParameters?.length ? "moderate" : "low",
    aiData: ai?.data || null,
    createdAt: new Date().toISOString(),
  };

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
  const ai = await analyzeMedicine({
    medicineName: "Uploaded Medicine",
    ocrText: `Uploaded file name: ${fileName}`,
    imageText: "",
  });

  const row = {
    userId: req.user.id,
    fileName,
    medicineName: ai?.data?.medicineName || "Unknown Medicine",
    dosage: ai?.data?.dosage || "Follow doctor guidance",
    sideEffects: ai?.data?.sideEffects || [],
    precautions: ai?.data?.precautions || [],
    aiSummary: ai?.data?.purpose || "",
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
