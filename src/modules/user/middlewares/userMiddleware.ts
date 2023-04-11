import type { NextFunction, Request, Response } from 'express';
import { paramSchema, dataSchema, emailSchema } from '../schema/UserSchema';
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

  validateEmailParam(req: Request, res: Response, next: NextFunction) {
    emailSchema.parse(req.params);
    next();
  }
}
