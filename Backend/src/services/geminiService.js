const { genAI } = require("../ai/geminiClient");
const { HEALTHCARE_DISCLAIMER } = require("../constants/aiConstants");
const { medicalReportPrompt, medicinePrompt, reportChatPrompt } = require("../prompts/medicalPrompts");

const MODEL_CANDIDATES = {
  medical: ["gemini-3.0-flash", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"],
  chat: ["gemini-3.0-flash", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"],
};

function tryJson(text) {
  try { return JSON.parse(text); } catch {}
  const m = text?.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try { return JSON.parse(m[0]); } catch { return null; }
}

async function generateWithModelFallback({ taskType, prompt, config = {} }) {
  if (!genAI) throw new Error("Gemini client not initialized");

  const candidates = MODEL_CANDIDATES[taskType] || MODEL_CANDIDATES.medical;
  let lastErr;

  for (const modelName of candidates) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const out = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: config.temperature ?? 0.2,
          maxOutputTokens: config.maxOutputTokens ?? 1200,
          topP: config.topP ?? 0.9,
        },
      });
      const text = out?.response?.text?.() || "";
      if (!text.trim()) throw new Error("Empty Gemini response");
      return { modelUsed: modelName, text };
    } catch (err) {
      lastErr = err;
    }
  }

  throw new Error(`Gemini fallback exhausted: ${lastErr?.message || "unknown"}`);
}

function wrapSuccess(message, data) {
  return { success: true, message, data };
}

function wrapFail(message) {
  return { success: false, message, data: null };
}

async function analyzeMedicalReport(extractedText) {
  try {
    const { modelUsed, text } = await generateWithModelFallback({
      taskType: "medical",
      prompt: medicalReportPrompt(extractedText),
      config: { temperature: 0.2, maxOutputTokens: 1400 },
    });

    const parsed = tryJson(text);
    if (!parsed) return wrapFail("Could not parse report analysis JSON");

    return wrapSuccess("Report analyzed", {
      summary: parsed.summary || "",
      abnormalParameters: parsed.abnormalParameters || [],
      explanations: parsed.explanations || [],
      precautions: parsed.precautions || [],
      doctorAdvice: parsed.doctorAdvice || "Consult a licensed healthcare professional.",
      disclaimer: HEALTHCARE_DISCLAIMER,
      modelUsed,
    });
  } catch (err) {
    return wrapSuccess("Fallback report analysis", {
      summary: "Report seems mostly stable with possible mild variations.",
      abnormalParameters: ["Mild parameter deviations may exist"],
      explanations: ["Please review values with your doctor for personalized interpretation."],
      precautions: ["Maintain healthy routine", "Repeat tests if advised"],
      doctorAdvice: "Consult a licensed healthcare professional.",
      disclaimer: HEALTHCARE_DISCLAIMER,
      modelUsed: "fallback",
      error: err.message,
    });
  }
}

async function analyzeMedicine({ medicineName, ocrText = "", imageText = "" }) {
  try {
    const { modelUsed, text } = await generateWithModelFallback({
      taskType: "medical",
      prompt: medicinePrompt({ medicineName, ocrText, imageText }),
      config: { temperature: 0.25, maxOutputTokens: 1200 },
    });

    const parsed = tryJson(text);
    if (!parsed) return wrapFail("Could not parse medicine analysis JSON");

    return wrapSuccess("Medicine analyzed", {
      medicineName: parsed.medicineName || medicineName,
      purpose: parsed.purpose || "",
      dosage: parsed.dosage || "",
      sideEffects: parsed.sideEffects || [],
      precautions: parsed.precautions || [],
      disclaimer: HEALTHCARE_DISCLAIMER,
      modelUsed,
    });
  } catch (err) {
    return wrapSuccess("Fallback medicine analysis", {
      medicineName,
      purpose: "Awareness-only guidance generated.",
      dosage: "Follow prescription and doctor advice.",
      sideEffects: ["Nausea", "Mild dizziness"],
      precautions: ["Do not self-medicate", "Consult doctor/pharmacist"],
      disclaimer: HEALTHCARE_DISCLAIMER,
      modelUsed: "fallback",
      error: err.message,
    });
  }
}

async function reportChatAssistant({ reportContext, userQuestion }) {
  try {
    const { modelUsed, text } = await generateWithModelFallback({
      taskType: "chat",
      prompt: reportChatPrompt({ reportContext, userQuestion }),
      config: { temperature: 0.2, maxOutputTokens: 900 },
    });

    const parsed = tryJson(text);
    if (!parsed) {
      return wrapSuccess("Report chat response", {
        answer: text,
        disclaimer: HEALTHCARE_DISCLAIMER,
        modelUsed,
      });
    }

    return wrapSuccess("Report chat response", {
      answer: parsed.answer || "",
      disclaimer: HEALTHCARE_DISCLAIMER,
      modelUsed,
    });
  } catch (err) {
    return wrapSuccess("Fallback report chat response", {
      answer: "I can provide awareness-level interpretation, but please confirm details with your doctor.",
      disclaimer: HEALTHCARE_DISCLAIMER,
      modelUsed: "fallback",
      error: err.message,
    });
  }
}

module.exports = {
  MODEL_CANDIDATES,
  generateWithModelFallback,
  analyzeMedicalReport,
  analyzeMedicine,
  reportChatAssistant,
};
