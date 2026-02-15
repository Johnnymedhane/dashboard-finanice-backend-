import User from "../models/user.js";

export async function createUser(userData) {
  return await User.create(userData);
}

export async function findUserByEmail(email) {
  return await User.findOne({ email }).select("+password");
}


