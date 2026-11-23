import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import healthRouter from "./routes/health.routes.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";
import { notFoundHandler } from "./middleware/not-found.middleware.js";

const app = express();
const allowedOrigins = new Set([
  process.env.CLIENT_URL || "http://localhost:8081",
  "http://localhost:8081",
  "http://127.0.0.1:8081",
]);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.has(origin));
    },
  }),
);
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

app.use("/api/health", healthRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
