const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};
