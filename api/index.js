import app from "../app.js";
import { connectDB } from "../config/db.js";

// Vercel Serverless Function entrypoint.
// This file is executed per request (with warm reuse when possible).

let connectPromise;

async function ensureDbConnected() {
  if (connectPromise) return connectPromise;
  connectPromise = connectDB();
  return connectPromise;
}

export default async function handler(req, res) {
  try {
    await ensureDbConnected();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database connection failed", error: err?.message });
  }

  return app(req, res);
}
