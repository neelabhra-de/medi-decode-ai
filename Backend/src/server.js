const app = require("./app");
const { connectDb } = require("./config/db");
const env = require("./config/env");

(async () => {
  try {
    await connectDb();
    app.listen(env.port, () => {
      console.log(`[api] MediDecode AI backend running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error("[api] Startup failure", err);
    process.exit(1);
  }
})();
