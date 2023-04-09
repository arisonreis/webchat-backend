import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserMiddleware } from '../middlewares/userMiddleware';

const userController = new UserController();
const userMiddleware = new UserMiddleware();
export const userRoutes = Router();

userRoutes.post('/create',userMiddleware.execute, userController.create);
