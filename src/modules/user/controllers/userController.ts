import type { Request, Response } from 'express';
import { IUserData } from '../../../shared/types/UserDatacreate';
import { AppError } from '../../../shared/errors';
import { CreateUserService } from '../services/createUserService';
import { GetUserService } from '../services/getUserService';
import { DeleteUserService } from '../services/deleteUserService';
import { sign } from 'jsonwebtoken';
import { GetUserByEmailService } from '../services/getUserByEmailService';
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

    const token = sign({ id: creatingUser.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return res.status(201).json({
      status: 'sucess',
      token: token,
    });
  }

  public async Get(req: Request, res: Response) {
    const id = req.body;

    const getUser = await new GetUserService().execute({ id: id });

    if (getUser) {
      return res.status(200).json(getUser);
    }
  }

  public async Delete(req: Request, res: Response) {
    const id = req.body;

    const userExists = await new GetUserService().execute({ id: id });

    if (userExists) {
      const deletingUser = await new DeleteUserService().execute({ id: id });
      if (deletingUser) {
        return res.json(204);
      }
    }
  }

  public async GetByEmail(req: Request, res: Response) {
    const { email } = req.body;

    const user = await new GetUserByEmailService().execute({ email: email });
    if (user) {
      return res.status(200).send();
    }
    return res.status(400).send();
  }
}
