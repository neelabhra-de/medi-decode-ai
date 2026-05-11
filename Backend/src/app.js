const express = require("express");
const cors = require("cors");
const env = require("./config/env");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const chatRoutes = require("./routes/chatRoutes");
const historyRoutes = require("./routes/historyRoutes");
const profileRoutes = require("./routes/profileRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true, service: "MediDecode AI API" }));
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/profile", profileRoutes);
app.use(errorHandler);

module.exports = app;
