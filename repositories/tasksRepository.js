import Task from "../models/tasks.js";
// Get all tasks
export async function getAllTasks() {
  const tasks = await Task.find();
  return tasks;
}

// Get pending tasks count
export async function getPendingCount() {
  return await Task.countDocuments({ completed: false });
}

// Get a task by ID
export async function getTaskById(id) {
  return await Task.findById(id);
}

// Create a new task
export async function createTask(taskData) {
  const task  = new Task(taskData);
  return await task.save();
}

// Update a task by ID
export async function updateTask(id, taskData) {
  return await Task.findByIdAndUpdate(id, taskData, { new: true });
}

// Delete a task by ID
export async function deleteTask(id) {
  return await Task.findByIdAndDelete(id);
}



