const { reportChatAssistant } = require("../services/geminiService");
const { chats } = require("../data/memoryStore");

async function chatWithReport(req, res) {
  const { message, reportContext = "Blood report" } = req.body;
  if (!message) return res.status(400).json({ message: "message required" });

  const ai = await reportChatAssistant({ reportContext, userQuestion: message });
  const reply = ai?.data?.answer || "Please consult your doctor for personalized interpretation.";

  chats.push({ userId: req.user.id, message, reply, createdAt: new Date().toISOString() });
  return res.json({ reply, aiMeta: { success: ai.success, message: ai.message, modelUsed: ai?.data?.modelUsed } });
}

module.exports = { chatWithReport };
