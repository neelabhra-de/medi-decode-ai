const mongoose = require("mongoose");
const env = require("./env");

async function connectDb() {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is required in .env");
  }

  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  });

  await mongoose.connection.db.admin().ping();
  console.log("[db] Connected to MongoDB Atlas");

  mongoose.connection.on("error", (err) => console.error("[db] error:", err.message));
  mongoose.connection.on("disconnected", () => console.warn("[db] disconnected"));
}

module.exports = { connectDb };
