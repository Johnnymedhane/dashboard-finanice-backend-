import * as tasksService from "../services/tasksService.js";
// check if value is a plain object (not null, not array)
function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
// validate task payload for create and update operations
function validateTaskPayload(payload, { requireTitle }) {
  if (!isPlainObject(payload)) {
    return { message: "Validation error", error: "JSON body is required" };
  }

  const fields = [];
  const errors = [];

  const hasTitle = Object.prototype.hasOwnProperty.call(payload, "title");
  const hasProgress = Object.prototype.hasOwnProperty.call(payload, "progress");
  const hasCompleted = Object.prototype.hasOwnProperty.call(
    payload,
    "completed",
  );

  if (requireTitle || hasTitle) {
    if (
      typeof payload.title !== "string" ||
      payload.title.trim().length === 0
    ) {
      fields.push("title");
      errors.push("title is required and must be a non-empty string");
    }
  }

  if (hasProgress) {
    if (
      !Number.isFinite(payload.progress) ||
      payload.progress < 0 ||
      payload.progress > 100
    ) {
      fields.push("progress");
      errors.push("progress must be a number between 0 and 100");
    }
  }

  if (hasCompleted) {
    if (typeof payload.completed !== "boolean") {
      fields.push("completed");
      errors.push("completed must be a boolean");
    }
  }

  if (errors.length > 0) {
    return { message: "Validation error", fields, error: errors.join("; ") };
  }

  return null;
}

// Get all tasks
export async function fetchGetAllTasks(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID is missing" });
    }
    const tasks = await tasksService.getAllTasks(userId);
    if (tasks.length === 0) {
      return res
        .status(200)
        .json({
          message: "No tasks yet. Start by creating a new task.",
          tasks: [],
        });
    }
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
}

// Get pending tasks count
export async function fetchGetPendingTasks(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID is missing" });
    }
    const pendingCount = await tasksService.getPendingTasks(userId);
    if (pendingCount === 0) {
      return res
        .status(200)
        .json({ message: "No pending tasks.", pendingCount: 0 });
    }
    res.status(200).json({ pendingCount });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching pending tasks", error: err.message });
  }
}

// Get a task by ID
export async function fetchGetTaskById(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID is missing" });
    }
    const task = await tasksService.getTaskById(req.params.id, userId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    if (err?.name === "CastError") {
      return res
        .status(400)
        .json({ message: `Invalid task id ${req.params.id}` });
    }
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
}

// Create a new task
export async function fetchCreateTask(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID is missing" });
    }
    const validationError = validateTaskPayload(req.body, {
      requireTitle: true,
    });
    if (validationError) {
      return res.status(400).json(validationError);
    }

    if (typeof req.body.title === "string") {
      req.body.title = req.body.title.trim();
    }

    const newTask = await tasksService.createNewTask(req.body, userId);
    res.status(201).json(newTask);
  } catch (err) {
    if (err?.name === "ValidationError") {
      const fields = Object.keys(err.errors || {});
      return res
        .status(400)
        .json({ message: "Validation error", fields, error: err.message });
    }
    console.error("Error creating task:", err);
    res
      .status(500)
      .json({ message: "Error creating task", error: err.message });
  }
}

// Update a task by ID
export async function fetchUpdateTask(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID is missing" });
    }

    const validationError = validateTaskPayload(req.body, {
      requireTitle: false,
    });
    if (validationError) {
      return res.status(400).json(validationError);
    }

    if (typeof req.body.title === "string") {
      req.body.title = req.body.title.trim();
    }

    const updatedTask = await tasksService.updateExistingTask(
      req.user?.id,
      req.params.id,
      req.body,
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (err) {
    if (err?.name === "CastError") {
      return res
        .status(400)
        .json({ message: `Invalid task id ${req.params.id}` });
    }
    if (err?.name === "ValidationError") {
      const fields = Object.keys(err.errors || {});
      return res
        .status(400)
        .json({ message: "Validation error", fields, error: err.message });
    }
    console.error("Error updating task:", err);
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
}

// Delete a task by ID
export async function fetchDeleteTask(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User ID is missing" });
    }
    const deletedTask = await tasksService.deleteTask(userId, req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Deleted", id: deletedTask._id });
  } catch (err) {
    if (err?.name === "CastError") {
      return res
        .status(400)
        .json({ message: `Invalid task id ${req.params.id}` });
    }

    console.error("Error deleting task:", err);
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
}
