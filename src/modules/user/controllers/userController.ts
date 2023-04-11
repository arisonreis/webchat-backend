import type { Request, Response } from 'express';
import { IUserData } from '../../../shared/types/UserDatacreate';
import { AppError } from '../../../shared/errors';
import { CreateUserService } from '../services/createUserService';
import { GetAllUsersService } from '../services/getAllUsersService';
import { GetUserByEmailService } from '../services/getUserByEmailService';
import { GetUserByIdService } from '../services/getUserByIdService';
import { DeletUserService } from '../services/deleteUserService';
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
      return res.status(201).json({
        status: 'sucess',
        message: 'user created successfully',
      });
    }
  }

  public async GetAll(req: Request, res: Response) {
    const getAllUsers = await new GetAllUsersService().execute();
    if (getAllUsers.length >= 1) {
      return res.status(200).json(getAllUsers);
    } else {
      return res.status(200).json({
        status: 'sucess',
        message: 'there are no users in the database',
      });
    }
  }

  public async GetUserByEmail(req: Request, res: Response) {
    const { email } = req.params;

    const getUserByEmail = await new GetUserByEmailService().execute({ email });

    if (getUserByEmail) {
      return res.status(200).json(getUserByEmail);
    }

    if (!getUserByEmail) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }
  }

  public async GetById(req: Request, res: Response) {
    const { id } = req.params;
    const getUserById = await new GetUserByIdService().execute({ id: id });

    if (getUserById) {
      return res.status(200).json(getUserById);
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'user not found',
      });
    }
  }

  public async Delete(req: Request, res: Response) {
    const { id } = req.params;

    const userExists = await new GetUserByIdService().execute({ id: id });

    if (userExists) {
      const deletingUser = await new DeletUserService().execute({ id: id });
      if (deletingUser) {
        return res.status(202).send();
      }else{
        return res.status(400).json({
          status:"error",
          message:"User not found",
        })
      }
    }
  }
}
