import type { NextFunction, Request, Response } from 'express';
import { dataSchema } from '../schema/UserSchema';
import { AppError } from '../../../shared/errors';
export class UserMiddleware {
  execute(req: Request, res: Response, next: NextFunction) {
    dataSchema.parse(req.body);
    next();
  }
}
