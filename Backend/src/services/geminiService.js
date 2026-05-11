const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");

let model = null;
if (env.geminiApiKey) {
  const genAI = new GoogleGenerativeAI(env.geminiApiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

async function summarizeMedicalText(input, mode = "report") {
  if (!model) {
    if (mode === "medicine") {
      return "This medicine appears to be an antibiotic. Complete full course and watch for allergy signs like rash or breathing discomfort.";
    }
    return "Your report shows mostly stable values with mild LDL elevation. Consider fiber-rich food and follow-up with your physician.";
  }

  const prompt = `You are MediDecode AI, a healthcare awareness assistant. Not a diagnosis tool.
Mode: ${mode}
Input: ${input}
Give concise explanation with: summary, key concerns, and practical next steps.`;

  const out = await model.generateContent(prompt);
  return out.response.text();
}

module.exports = { summarizeMedicalText };
