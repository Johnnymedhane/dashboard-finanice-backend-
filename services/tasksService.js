import * as tasksRepository from "../repositories/tasksRepository.js";

// Get all tasks
export async function getAllTasks() {
  return await tasksRepository.getAllTasks();
}

// Get pending tasks count
export async function getPendingTasks() {
  return await tasksRepository.getPendingCount();
}

// Get a task by ID
export async function getTaskById(id) {
  return await tasksRepository.getTaskById(id);
}

// Create a new task
export async function createNewTask(taskData) {
  return await tasksRepository.createTask(taskData);
}

// Update a task by ID
export async function updateExistingTask(id, taskData) {
  return await tasksRepository.updateTask(id, taskData);
}

// Delete a task by ID
export async function deleteTask(id) {
  return await tasksRepository.deleteTask(id);
}