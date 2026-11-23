import mongoose from "mongoose";

const databaseStates = ["disconnected", "connected", "connecting", "disconnecting"];

export function getHealth(req, res) {
  const databaseStatus =
    databaseStates[mongoose.connection.readyState] ?? "unknown";

  res.status(200).json({
    success: true,
    message: "ShikshaSathi AI API is running.",
    serverStatus: "running",
    databaseStatus,
    timestamp: new Date().toISOString(),
  });
}
