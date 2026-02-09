
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
let db
export  async function connectDB() {
  try {
     await mongoose.connect(MONGO_URI);
      db = mongoose.connection.db;
    console.log("MongoDB connected", db.databaseName);
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export function getDB() {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database not connected. Call connectDB() first.");
  }

  return db;
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Error disconnecting MongoDB:", error);
  }
}