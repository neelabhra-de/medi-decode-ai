const { summarizeMedicalText } = require("../services/geminiService");
const { chats } = require("../data/memoryStore");

async function chatWithReport(req, res) {
  const { message, reportContext = "Blood report" } = req.body;
  if (!message) return res.status(400).json({ message: "message required" });

  const reply = await summarizeMedicalText(`Context: ${reportContext}\nUser: ${message}\nReply as healthcare awareness assistant.`, "report");
  chats.push({ userId: req.user.id, message, reply, createdAt: new Date().toISOString() });
  return res.json({ reply });
}

module.exports = { chatWithReport };
