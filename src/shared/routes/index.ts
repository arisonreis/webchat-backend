import { Router } from 'express';

import { userRoutes } from '../../modules/user/routes/users.routes';

export const routes = Router();

routes.use('/user', userRoutes);
