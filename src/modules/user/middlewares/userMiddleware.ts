import type { NextFunction, Request, Response } from 'express';
import { paramSchema, dataSchema } from '../schema/UserSchema';
import { verify } from 'jsonwebtoken';
import { AppError } from '../../../shared/errors';
export class UserMiddleware {
  validateBody(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'POST') {
      throw new AppError('Method not accepted ');
    }
    dataSchema.parse(req.body);
    next();
  }

  validateParams(req: Request, res: Response, next: NextFunction) {
    paramSchema.parse(req.params);
    next();
  }

  async AuthValidator(req: Request, res: Response, next: NextFunction) {
    interface IJwtPayload {
      id: string;
    }

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
