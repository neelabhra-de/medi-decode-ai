const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const env = require("./config/env");

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const auth = require("./middlewares/authMiddleware");
const upload = require("./middlewares/uploadMiddleware");
const { uploadReport } = require("./controllers/reportController");
const { scanMedicine } = require("./controllers/medicineController");
const { reportHistory } = require("./controllers/reportController");
const { medicineHistory } = require("./controllers/medicineController");
const { getProfile } = require("./controllers/userController");
const { reportChat } = require("./controllers/chatController");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(helmet());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/health", (req, res) => res.json({ success: true, message: "MediDecode API healthy", data: null }));

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Backward-compatible aliases for older frontend paths
app.post("/api/upload/report", auth, upload.single("file"), uploadReport);
app.post("/api/upload/medicine", auth, upload.single("file"), scanMedicine);
app.get("/api/history/reports", auth, reportHistory);
app.get("/api/history/medicines", auth, medicineHistory);
app.get("/api/profile", auth, getProfile);
app.post("/api/chat/report", auth, reportChat);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
