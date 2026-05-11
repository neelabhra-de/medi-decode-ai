const app = require("./app");
const env = require("./config/env");
const { connectDb } = require("./config/db");

(async () => {
  try {
    await connectDb();
    app.listen(env.port, () => {
      console.log(`[api] Server running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error("[api] Failed to start:", err.message);
    process.exit(1);
  }
})();
