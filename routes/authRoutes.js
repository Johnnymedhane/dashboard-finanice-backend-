
import express from 'express';
import * as authController from '../controllers/authController.js';


const authRouter = express.Router();

authRouter.post('/register', authController.signUp);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);



export default authRouter;