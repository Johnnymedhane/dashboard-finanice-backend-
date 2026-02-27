import express from "express";
import * as tasksController from "../controllers/tasksController.js";
import { validateRequest } from "../middleware/validate.js";
import { createTaskSchema, updateTaskSchema } from "../validations/tasksvalidation.js";
const tasksRouter = express.Router();

tasksRouter.get("/", tasksController.getTasksController);
tasksRouter.get("/:id", tasksController.getTaskByIdController);
tasksRouter.post("/", validateRequest(createTaskSchema), tasksController.createTaskController);
tasksRouter.put("/:id", validateRequest(updateTaskSchema), tasksController.updateTaskController);
tasksRouter.delete("/:id", tasksController.deleteTaskController);

export default tasksRouter;