import type { Request, Response } from 'express';
import { IUserData } from '../../../shared/types/UserDatacreate';
import { AppError } from '../../../shared/errors';
export class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, perfil_url }: IUserData = req.body;

    if (!name && !email && !perfil_url) {
      throw new AppError('No data has been reported', 400);
    }

    return res.status(200).json({ message: 'ok' });
  }

  public async GetAll(){
    
  }


}
