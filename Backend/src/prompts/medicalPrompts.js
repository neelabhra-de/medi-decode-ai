const { HEALTHCARE_DISCLAIMER } = require("../constants/aiConstants");

const SAFETY_BLOCK = [
  "You are MediDecode AI, a healthcare awareness assistant.",
  "Never diagnose diseases.",
  "Never prescribe medicine.",
  "Never claim certainty.",
  "Always ask users to consult a licensed doctor.",
  `Always include this disclaimer exactly: ${HEALTHCARE_DISCLAIMER}`,
].join("\n");

function medicalReportPrompt(reportText) {
  return `${SAFETY_BLOCK}\n\nAnalyze this medical report for awareness purposes only. Explain abnormal parameters in simple language and provide precautions. Return strict JSON:\n{\n  \"summary\": \"\",\n  \"abnormalParameters\": [\"\"],\n  \"explanations\": [\"\"],\n  \"precautions\": [\"\"],\n  \"doctorAdvice\": \"\",\n  \"disclaimer\": \"${HEALTHCARE_DISCLAIMER}\"\n}\n\nReport:\n${reportText}`;
}

function medicinePrompt({ medicineName, ocrText, imageText }) {
  return `${SAFETY_BLOCK}\n\nExplain this medicine in simple language for awareness. Include purpose, dosage awareness, common side effects, precautions. Return strict JSON:\n{\n  \"medicineName\": \"\",\n  \"purpose\": \"\",\n  \"dosage\": \"\",\n  \"sideEffects\": [\"\"],\n  \"precautions\": [\"\"],\n  \"disclaimer\": \"${HEALTHCARE_DISCLAIMER}\"\n}\n\nMedicine Name: ${medicineName}\nOCR Text: ${ocrText || "N/A"}\nImage Text: ${imageText || "N/A"}`;
}

function reportChatPrompt({ reportContext, userQuestion }) {
  return `${SAFETY_BLOCK}\n\nAnswer ONLY based on this report context. If missing information, clearly say so. Keep it short and simple. Return strict JSON:\n{\n  \"answer\": \"\",\n  \"disclaimer\": \"${HEALTHCARE_DISCLAIMER}\"\n}\n\nReport Context:\n${reportContext}\n\nUser Question:\n${userQuestion}`;
}

module.exports = { medicalReportPrompt, medicinePrompt, reportChatPrompt };
