import type { Request, Response } from 'express';
import { IUserData } from '../../../shared/types/UserDatacreate';
import { AppError } from '../../../shared/errors';
import { prisma } from '../../../shared/prisma';
import { CreateUserService } from '../services/createUserService';
export class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, perfil_url }: IUserData = req.body;

    if (!name && !email && !perfil_url) {
      throw new AppError('No data has been reported', 400);
    }
    const creatingUser = await new CreateUserService()
      .execute({
        name: name,
        email: email,
        perfil_url: perfil_url,
      })
      .catch((err) => {
        throw new AppError(err.message, err.status);
      });

    if (creatingUser) {
      return res.status(200).json({
        status: 'sucess',
        message: 'user created successfully',
      });
    }
  }

  public async GetAll() {
    const users = await prisma.userCreated.findMany();
    if (users) {
      return users;
    }
  }
}
