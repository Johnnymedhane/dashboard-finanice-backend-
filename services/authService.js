import * as authRepository from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });
}

export async function signUp(userData) {
  const { email, password } = userData;

  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error(
      "Email already exists. Please register with a different email.",
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await authRepository.createUser({
    ...userData,
    password: hashedPassword,
  });
  const token = generateToken(newUser);
  return {
    token,
    user: { id: newUser._id, email: newUser.email, fullName: newUser.fullName },
  };
}

export async function login(userData) {
  const { email, password } = userData;
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);
  return {
    token,
    user: { id: user._id, email: user.email, fullName: user.fullName },
  };
}
