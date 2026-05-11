const Chat = require("../models/Chat");
const Report = require("../models/Report");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const { reportChatAssistant } = require("../services/geminiService");

const reportChat = asyncHandler(async (req, res) => {
  const legacyQuestion = req.body.message;
  const legacyContext = req.body.reportContext;

  // Legacy mode: /api/chat/report with {message, reportContext}
  if (legacyQuestion && !req.body.reportId) {
    const ai = await reportChatAssistant({
      reportContext: legacyContext || "No report context provided",
      userQuestion: legacyQuestion,
    });

    return sendSuccess(res, "Chat response generated", {
      answer: ai.data?.answer || "No response",
      reply: ai.data?.answer || "No response",
      ai,
    });
  }

  // New mode: /api/chat/report-chat with {reportId, question}
  const { reportId, question } = req.body;
  const report = await Report.findOne({ _id: reportId, userId: req.user._id });
  if (!report) return sendError(res, "Report not found", 404);

  const reportContext = `Summary: ${report.aiSummary}\nAbnormal: ${(report.abnormalParameters || []).join(", ")}\nRaw: ${report.extractedText}`;
  const ai = await reportChatAssistant({ reportContext, userQuestion: question });

  const chat = await Chat.findOneAndUpdate(
    { userId: req.user._id, reportId },
    {
      $push: {
        messages: [
          { role: "user", content: question },
          { role: "assistant", content: ai.data?.answer || "No response" },
        ],
      },
    },
    { new: true, upsert: true }
  );

  return sendSuccess(res, "Chat response generated", {
    answer: ai.data?.answer,
    reply: ai.data?.answer,
    chat,
    ai,
  });
});

module.exports = { reportChat };
