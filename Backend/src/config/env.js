const dotenv = require("dotenv");
dotenv.config();

const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "super-secret-demo-key",
  mongoUri: process.env.MONGODB_URI || "",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  clientUrl: process.env.CLIENT_URL || process.env.FRONTEND_ORIGIN || "http://localhost:5173",
};

module.exports = env;
