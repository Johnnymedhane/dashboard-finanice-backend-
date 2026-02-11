import * as tasksController from "../controllers/tasksController.js";
import express from "express";

const tasksRouter = express.Router();
tasksRouter.get("/", tasksController.fetchGetAllTasks);
tasksRouter.get("/pending", tasksController.fetchGetPendingTasks);
tasksRouter.get("/:id", tasksController.fetchGetTaskById);
tasksRouter.post("/", tasksController.fetchCreateTask);
tasksRouter.put("/:id", tasksController.fetchUpdateTask);
tasksRouter.delete("/:id", tasksController.fetchDeleteTask);

export default tasksRouter;