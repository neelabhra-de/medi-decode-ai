const mongoose = require("mongoose");
const env = require("./env");

async function connectDb() {
  if (!env.mongoUri) {
    console.log("[db] MONGODB_URI not provided, using in-memory demo store.");
    return false;
  }

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    });

    mongoose.connection.on("error", (err) => {
      console.error("[db] MongoDB error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("[db] MongoDB disconnected");
    });

    await mongoose.connection.db.admin().ping();
    console.log("[db] Connected to MongoDB Atlas and ping successful");
    return true;
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
    throw err;
  }
}

module.exports = { connectDb };
