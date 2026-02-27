import Task from "../models/tasks.js";
// Create a new task
export async function createTask(data) {
  return Task.create(data);
}

// Get all tasks
export async function getTasks(filter, page, limit) {
  const skip = (page - 1) * limit;

  const totalTasks = await Task.countDocuments(filter);
  const tasks = await Task.find(filter)
    .skip(skip)
    .sort({ date: -1 })
    .limit(limit);

  return { count: totalTasks, tasks };
}

// Get a task by ID
export async function getTaskById(id, userId) {
  const filter = { _id: id, deletedAt: null };
  if (userId) {
    filter.user = userId;
  }
  return Task.findOne(filter);
  // return Task.findOne({ _id: id, user: userId, deletedAt: null });
}

// Update a task by ID
export async function updateTask(id, data, userId) {
  const filter = { _id: id, deletedAt: null };
  if (userId) {
    filter.user = userId;
  }
  return Task.findOneAndUpdate(filter, data, { new: true });
  // return Task.findOneAndUpdate({ _id: id, user: userId, deletedAt: null }, data, { new: true });
}

// Soft delete a task by ID
export async function softDeleteTask(id, userId) {
  const filter = { _id: id, deletedAt: null };
  if (userId) {
    filter.user = userId;
  }
  return Task.findOneAndUpdate(
    filter,
    { deletedAt: new Date() },
    { new: true },
  );
  // return Task.findOneAndUpdate(
  //   { _id: id, user: userId, deletedAt: null },
  //   { deletedAt: new Date() },
  //   { new: true },
  // );
}
