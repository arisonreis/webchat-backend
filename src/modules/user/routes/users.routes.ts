import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { UserMiddleware } from '../middlewares/userMiddleware';

const userController = new UserController();
const userMiddleware = new UserMiddleware();
export const userRoutes = Router();

userRoutes.post('/create', userMiddleware.validateBody, userController.create);
userRoutes.get('/list', userController.GetAll);
userRoutes.get(
  '/get-by-email/:email',
  userMiddleware.validateEmailParam,
  userController.GetUserByEmail
);
userRoutes.get(
  '/get-by-id/:id',
  userMiddleware.validateParams,
  userController.GetById
);
userRoutes.delete(
  '/delete/:id',
  userMiddleware.validateParams,
  userController.Delete
);
