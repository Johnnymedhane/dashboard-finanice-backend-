import * as tasksRepository from "../repositories/tasksRepository.js";

// Get all tasks
export async function getAllTasks(userId) {
  return await tasksRepository.getAllTasks(userId);
}

// Get pending tasks count
export async function getPendingTasks(userId) {
  return await tasksRepository.getPendingCount(userId);
}

// Get a task by ID
export async function getTaskById(id, userId) {
  return await tasksRepository.getTaskById(userId, id);
}

// Create a new task
export async function createNewTask(taskData, userId) {
  return await tasksRepository.createTask(taskData, userId);
}

// Update a task by ID
export async function updateExistingTask(userId, id, taskData) {
  return await tasksRepository.updateTask(userId, id, taskData);
}

// Delete a task by ID
export async function deleteTask(userId, id) {
  return await tasksRepository.deleteTask(userId, id);
}