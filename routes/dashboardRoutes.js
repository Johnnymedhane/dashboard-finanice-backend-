import express from "express";
import * as dashboardController from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", dashboardController.getDashboardDataController);
export default dashboardRouter;