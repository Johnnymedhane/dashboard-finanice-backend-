import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function authMiddleware(req, res, next) {
  let token = req.cookies?.token;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  if (!token) {
    return res.status(401).json({ error: " You are not authorized! Please provide a valid token." });
  }

  

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = {id: user._id};
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}