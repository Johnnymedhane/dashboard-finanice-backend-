import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export async function authenticateToken(req, res, next) {
  try {
    const tokenHeader = req.headers["authorization"]?.split(" ")[1];

    const tokenCookie = req.cookies?.token;

    const token = tokenHeader || tokenCookie;
    //  let token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    req.user = { id: decoded.userId }; // Attach user ID to request object for downstream use
    next();
  } catch (error) {
    console.error("Error authenticating token:", error);
    return res.status(401).json({ message: "Invalid access token" });
  }
}
