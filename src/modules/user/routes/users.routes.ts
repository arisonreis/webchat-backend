import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserMiddleware } from '../middlewares/userMiddleware';

const userController = new UserController();
const userMiddleware = new UserMiddleware();
export const userRoutes = Router();

userRoutes.post('/create', userMiddleware.validateBody, userController.create);
userRoutes.get('/get', userMiddleware.AuthValidator, userController.Get);
userRoutes.delete(
  '/delete',
  userMiddleware.validateParams,
  userController.Delete
);
userRoutes.post(
  '/get-by-email',
  userMiddleware.validateBody,
  userController.GetByEmail
);
