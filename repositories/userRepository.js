import User from "../models/user.js";

export async function getCurrentUser(userId) {
  return await User.findById(userId).select("-password");
}

export async function updateUserProfile(userId, updateData) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  Object.assign(user, updateData);
  await user.save();
  return user;
}
