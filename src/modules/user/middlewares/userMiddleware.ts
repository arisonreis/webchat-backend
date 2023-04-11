import type { NextFunction, Request, Response } from 'express';
import { dataSchema } from '../schema/UserSchema';
import { verify } from 'jsonwebtoken';
import { AppError } from '../../../shared/errors';

interface IJwtPayload {
  id: string;
}

export class UserMiddleware {
  validateBody(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'POST') {
      throw new AppError('Method not accepted ');
    }
    dataSchema.parse(req.body);
    next();
  }

  validateParams(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError('Unauthorized', 401);
    }

    const token = authorization.split(' ')[1];
    const { id }: IJwtPayload = verify(
      token,
      process.env.JWT_SECRET
    ) as IJwtPayload;

    req.body = id;

    next();
  }

  async AuthValidator(req: Request, res: Response, next: NextFunction) {


    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError('Unauthorized', 401);
    }

    const token = authorization.split(' ')[1];
    const { id }: IJwtPayload = verify(
      token,
      process.env.JWT_SECRET
    ) as IJwtPayload;

    req.body = id;
    next();
  }
}
