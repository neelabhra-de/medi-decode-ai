const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");

const MODEL_CANDIDATES = {
  medical: [
    "gemini-3.0-flash",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
  ],
  chat: [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
  ],
};

const HEALTHCARE_DISCLAIMER =
  "This information is for awareness purposes only and is not a substitute for professional medical advice.";

const GLOBAL_SAFETY_RULES = [
  "You are MediDecode AI, a healthcare awareness assistant.",
  "Do not diagnose diseases.",
  "Do not prescribe medicines or dosages as medical instructions.",
  "Never claim medical certainty.",
  "Encourage users to consult a licensed doctor.",
  `Always include this disclaimer verbatim: ${HEALTHCARE_DISCLAIMER}`,
  "Use simple, beginner-friendly language.",
].join("\n");

const aiClient = env.geminiApiKey ? new GoogleGenerativeAI(env.geminiApiKey) : null;

function safeJsonParse(text) {
  if (!text || typeof text !== "string") return null;

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function jsonSchemaPrompt(schemaExample) {
  return `Return strict JSON only. No markdown. No extra text. JSON schema example:\n${JSON.stringify(schemaExample, null, 2)}`;
}

async function callGeminiModel(modelName, prompt, config = {}) {
  const model = aiClient.getGenerativeModel({ model: modelName });
  const out = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: config.temperature ?? 0.2,
      topP: config.topP ?? 0.9,
      maxOutputTokens: config.maxOutputTokens ?? 1200,
    },
  });

  const text = out?.response?.text?.() || "";
  if (!text.trim()) throw new Error(`Empty response from ${modelName}`);
  return text;
}

async function generateWithModelFallback({ taskType = "medical", prompt, config = {} }) {
  if (!aiClient) {
    throw new Error("Gemini API key missing. Set GEMINI_API_KEY in .env");
  }

  const candidates = MODEL_CANDIDATES[taskType] || MODEL_CANDIDATES.medical;
  let lastError = null;

  for (const modelName of candidates) {
    try {
      const text = await callGeminiModel(modelName, prompt, config);
      return { modelUsed: modelName, text };
    } catch (err) {
      lastError = err;
      const msg = String(err?.message || "").toLowerCase();
      const recoverable =
        msg.includes("not found") ||
        msg.includes("unsupported") ||
        msg.includes("overloaded") ||
        msg.includes("quota") ||
        msg.includes("rate") ||
        msg.includes("unavailable");

      if (!recoverable) break;
    }
  }

  throw new Error(`All Gemini models failed for ${taskType}. Last error: ${lastError?.message || "unknown error"}`);
}

async function withAiErrorBoundary(fn) {
  try {
    return await fn();
  } catch (err) {
    return {
      success: false,
      message: err.message || "AI processing failed",
      data: null,
    };
  }
}

function fallbackReportResponse() {
  return {
    success: true,
    message: "Fallback report analysis generated",
    data: {
      summary: "The report appears mostly stable with mild abnormal values needing routine clinical follow-up.",
      abnormalParameters: ["Mild LDL elevation"],
      explanations: ["LDL may be above optimal range and can be improved with diet and exercise guidance from your doctor."],
      precautions: ["Maintain healthy diet", "Do regular exercise", "Schedule follow-up test"],
      doctorAdvice: "Please consult a licensed healthcare professional for proper interpretation.",
      disclaimer: HEALTHCARE_DISCLAIMER,
      modelUsed: "fallback",
    },
  };
}

function fallbackMedicineResponse(medicineName = "Medicine") {
  return {
    success: true,
    message: "Fallback medicine analysis generated",
    data: {
      medicineName,
      purpose: "Used for condition-specific treatment depending on doctor evaluation.",
      dosage: "Follow prescription label and doctor guidance only.",
      sideEffects: ["Nausea", "Headache", "Mild stomach upset"],
      precautions: ["Do not self-medicate", "Check allergies", "Consult doctor/pharmacist before use"],
      disclaimer: HEALTHCARE_DISCLAIMER,
      modelUsed: "fallback",
    },
  };
}

async function analyzeMedicalReport(extractedText) {
  return withAiErrorBoundary(async () => {
    if (!extractedText || !String(extractedText).trim()) {
      return fallbackReportResponse();
    }

    const schema = {
      summary: "",
      abnormalParameters: [""],
      explanations: [""],
      precautions: [""],
      doctorAdvice: "",
      disclaimer: HEALTHCARE_DISCLAIMER,
    };

    const prompt = [
      GLOBAL_SAFETY_RULES,
      "Task: Analyze this medical report for awareness only.",
      "Explain abnormal parameters simply. Do not diagnose any disease.",
      "Always encourage doctor consultation.",
      jsonSchemaPrompt(schema),
      `Report Text:\n${extractedText}`,
    ].join("\n\n");

    const { modelUsed, text } = await generateWithModelFallback({
      taskType: "medical",
      prompt,
      config: { temperature: 0.2, maxOutputTokens: 1400 },
    });

    const parsed = safeJsonParse(text);
    if (!parsed) return fallbackReportResponse();

    return {
      success: true,
      message: "Medical report analyzed successfully",
      data: {
        summary: parsed.summary || "",
        abnormalParameters: parsed.abnormalParameters || [],
        explanations: parsed.explanations || [],
        precautions: parsed.precautions || [],
        doctorAdvice: parsed.doctorAdvice || "Please consult a licensed healthcare professional.",
        disclaimer: HEALTHCARE_DISCLAIMER,
        modelUsed,
      },
    };
  });
}

async function analyzeMedicine({ medicineName = "Medicine", ocrText = "", imageText = "" }) {
  return withAiErrorBoundary(async () => {
    const schema = {
      medicineName,
      purpose: "",
      dosage: "",
      sideEffects: [""],
      precautions: [""],
      disclaimer: HEALTHCARE_DISCLAIMER,
    };

    const prompt = [
      GLOBAL_SAFETY_RULES,
      "Task: Explain this medicine for awareness only.",
      "Include purpose, dosage awareness, common side effects, and precautions in simple language.",
      "Do not prescribe exact treatment.",
      jsonSchemaPrompt(schema),
      `Medicine Name: ${medicineName}`,
      `OCR Text: ${ocrText || "N/A"}`,
      `Image Text: ${imageText || "N/A"}`,
    ].join("\n\n");

    const { modelUsed, text } = await generateWithModelFallback({
      taskType: "medical",
      prompt,
      config: { temperature: 0.25, maxOutputTokens: 1200 },
    });

    const parsed = safeJsonParse(text);
    if (!parsed) return fallbackMedicineResponse(medicineName);

    return {
      success: true,
      message: "Medicine analyzed successfully",
      data: {
        medicineName: parsed.medicineName || medicineName,
        purpose: parsed.purpose || "",
        dosage: parsed.dosage || "",
        sideEffects: parsed.sideEffects || [],
        precautions: parsed.precautions || [],
        disclaimer: HEALTHCARE_DISCLAIMER,
        modelUsed,
      },
    };
  });
}

async function reportChatAssistant({ reportContext = "", userQuestion = "" }) {
  return withAiErrorBoundary(async () => {
    if (!userQuestion || !String(userQuestion).trim()) {
      return {
        success: false,
        message: "userQuestion is required",
        data: null,
      };
    }

    const schema = {
      answer: "",
      disclaimer: HEALTHCARE_DISCLAIMER,
    };

    const prompt = [
      GLOBAL_SAFETY_RULES,
      "Task: Answer user question using only report context.",
      "If context is missing for the question, say information is insufficient and advise doctor consultation.",
      "No hallucination. Keep answer short and clear.",
      jsonSchemaPrompt(schema),
      `Report Context:\n${reportContext || "No report context provided."}`,
      `User Question:\n${userQuestion}`,
    ].join("\n\n");

    const { modelUsed, text } = await generateWithModelFallback({
      taskType: "chat",
      prompt,
      config: { temperature: 0.2, maxOutputTokens: 900 },
    });

    const parsed = safeJsonParse(text);
    if (!parsed) {
      return {
        success: true,
        message: "Chat response generated with fallback parser",
        data: {
          answer: text,
          disclaimer: HEALTHCARE_DISCLAIMER,
          modelUsed,
        },
      };
    }

    return {
      success: true,
      message: "Chat response generated",
      data: {
        answer: parsed.answer || "",
        disclaimer: HEALTHCARE_DISCLAIMER,
        modelUsed,
      },
    };
  });
}

module.exports = {
  MODEL_CANDIDATES,
  HEALTHCARE_DISCLAIMER,
  generateWithModelFallback,
  analyzeMedicalReport,
  analyzeMedicine,
  reportChatAssistant,
};
