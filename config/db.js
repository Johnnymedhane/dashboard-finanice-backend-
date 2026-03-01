
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MAIN_DB = process.env.MONGO_URI;


let db

export  async function connectDB() {
  try {
     await mongoose.connect(MAIN_DB);
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
    console.log("All MongoDB connections closed");
  } catch (error) {
    console.error("Error disconnecting MongoDB:", error);
  }
}


   

