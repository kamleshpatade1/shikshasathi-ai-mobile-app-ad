import mongoose from "mongoose";

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected. The health endpoint remains available.");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error.name);
});

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured. Copy .env.example to .env and set the connection URI.",
    );
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.info("MongoDB connected successfully.");
}
