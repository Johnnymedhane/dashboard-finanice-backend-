
import joi from "joi";

// Validation schema for creating a task
export const createTaskSchema = joi.object({
  title: joi.string().required().min(3).max(100),
  completed: joi.boolean().optional(),
  progress: joi.number().min(0).max(100).optional(),
  date: joi.date().optional(),
  
});

// Validation schema for updating a task
export const updateTaskSchema = joi.object({
  title: joi.string().min(3).max(100).optional(),
  completed: joi.boolean().optional(),
  progress: joi.number().min(0).max(100).optional(),
  date: joi.date().optional(),
});