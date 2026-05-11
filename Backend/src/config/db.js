const mongoose = require("mongoose");
const env = require("./env");

async function connectDb() {
  if (!env.mongoUri) {
    console.log("[db] MONGODB_URI not provided, using in-memory demo store.");
    return false;
  }

  await mongoose.connect(env.mongoUri);
  console.log("[db] Connected to MongoDB");
  return true;
}

module.exports = { connectDb };
