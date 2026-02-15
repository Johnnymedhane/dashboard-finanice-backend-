import Task from "../models/tasks.js";
// Get all tasks
export async function getAllTasks(userId) {
  const tasks = await Task.find({ user: userId });
  return tasks;
}

// Get pending tasks count
export async function getPendingCount(userId) {
  return await Task.countDocuments({ user: userId, completed: false });
}

// Get a task by ID
export async function getTaskById(userId, id) {
  return await Task.findOne({ _id: id, user: userId });
}

// Create a new task
export async function createTask(taskData, userId) {
  // const task  = new Task(taskData);
  return await Task.create({ ...taskData, user: userId });
}

// Update a task by ID
export async function updateTask(userId, id, taskData) {
  return await Task.findOneAndUpdate({ _id: id, user: userId }, taskData, { new: true });
}

// Delete a task by ID
export async function deleteTask(userId, id) {
  return await Task.findOneAndDelete({ _id: id, user: userId });
}



