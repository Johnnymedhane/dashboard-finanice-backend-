import * as userRepository from "../repositories/userRepository.js";

export async function getCurrentUser(userId) {
  const user = await userRepository.getCurrentUser(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function updateUserProfile(userId, updateData) {
  const updatedUser = await userRepository.updateUserProfile(userId, updateData);
  if (!updatedUser) {
    throw new Error("User not found");
  }
  return updatedUser;
}