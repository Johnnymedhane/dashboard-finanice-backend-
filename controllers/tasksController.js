import * as tasksService from "../services/tasksService.js";

export async function getPendingTasksController(req, res) {
  try {
    const userId = req.user?.id;
    const pendingTasksCount = await tasksService.getPendingTasks(userId);
    res.status(200).json({ pendingTasksCount });
  } catch (error) {
    console.error("Error fetching pending tasks:", error);
    res.status(500).json({ message: "Failed to fetch pending tasks" });
  }
}

export async function getTasksController(req, res) {
  try {
    const userId = req.user?.id;
    const tasks = await tasksService.getTasks(req.query, userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
}

export async function createTaskController(req, res) {
  try {
    const userId = req.user?.id;
    const task = await tasksService.createTask(req.body, userId);
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ message: "Failed to create task", error: error.message });
  }
}

export async function getTaskByIdController(req, res) {
  try {
    const userId = req.user?.id;
    const task = await tasksService.getTaskById(req.params.id, userId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
}

export async function updateTaskController(req, res) {
  try {
    const userId = req.user?.id;
    const task = await tasksService.updateTask(req.params.id, req.body, userId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
}

export async function deleteTaskController(req, res) {
  try {
    const userId = req.user?.id;
    const task = await tasksService.deleteTask(req.params.id, userId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
}

