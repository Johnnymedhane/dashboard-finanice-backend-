import * as userService from "../services/userService.js";

// Get current user profile
export async function getCurrentUserController(req, res) {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User ID is missing" });
  }
  try {
    const userId = req.user.id;
    const user = await userService.getCurrentUser(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update user profile
export async function updateUserProfileController(req, res) {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User ID is missing" });
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Bad Request: Update data is missing" });
  }
  try {
    const userId = req.user.id;
    const updateData = req.body;
    const updatedUser = await userService.updateUserProfile(userId, updateData);
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
