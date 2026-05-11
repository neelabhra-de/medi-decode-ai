const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");

if (!env.geminiApiKey) {
  console.warn("[ai] GEMINI_API_KEY missing. AI routes will return fallback-safe responses.");
}

const genAI = env.geminiApiKey ? new GoogleGenerativeAI(env.geminiApiKey) : null;

module.exports = { genAI };
