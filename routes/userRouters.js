import * as userController from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.get("/profile", userController.getCurrentUserController);
userRouter.put("/profile", userController.updateUserProfileController);

export default userRouter;