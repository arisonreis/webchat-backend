import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../shared/errors';

export class UserMiddleware {
  async execute(req: Request, res: Response, next: NextFunction) {
    if (req.method == '') {
      return;
    }
  }
}
