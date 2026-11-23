import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = Number(process.env.PORT) || 5000;
const server = app.listen(port, () => {
  console.info(`ShikshaSathi AI API listening on port ${port}.`);
});

server.on("error", (error) => {
  console.error("HTTP server failed to start:", error.message);
  process.exitCode = 1;
});

connectDatabase().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown error.";
  const uri = process.env.MONGODB_URI;
  const safeMessage = uri ? message.replace(uri, "[redacted MongoDB URI]") : message;

  console.error(
    "MongoDB connection failed. The HTTP server remains available; check MONGODB_URI and database availability.",
    safeMessage,
  );
});
