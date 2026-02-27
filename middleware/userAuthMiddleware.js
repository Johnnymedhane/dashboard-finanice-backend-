import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export async function authenticateToken(req, res, next) {
 let token = req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

 if (!token) {
   return res.status(401).json({ message: "Access token is missing" });
 }

 const decoded = jwt.verify(token, JWT_SECRET);

 const user = await Customer.findOne({ uuid: decoded.uuid });
 if (!user) {
   return res.status(404).json({ message: "User not found" });
 }
 req.user = { id: user._id }; // Attach user ID to request object for downstream use
 next();
 
}