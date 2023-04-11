import { prisma } from '../../../shared/prisma';
import type { IUserData } from '../../../shared/types/UserDatacreate';
import { AppError } from '../../../shared/errors';
import { GetUserByEmailService } from './getUserByEmailService';
export class CreateUserService {
  async execute({ name, email, perfil_url }: IUserData) {
    if (name && email && !perfil_url) {
      const checkingForExists = await new GetUserByEmailService().execute({
        email: email,
      });

      if (checkingForExists) {
        throw new AppError('user already exists', 400);
      }
      const newUser = await prisma.userCreated
        .create({
          data: {
            name: name,
            email: email,
          },
        })
        .catch(() => {
          throw new AppError('An error occurred while creating the user', 500);
        });
      if (newUser) {
        return newUser;
      }
    }

    if (name && perfil_url && !email) {
      const newUser = await prisma.userCreated
        .create({
          data: {
            name: name,
            perfil_url: perfil_url,
          },
        })
        .catch(() => {
          throw new AppError('An error occurred while creating the user', 500);
        });

      if (newUser) {
        return newUser;
      }
    }

    if (name && !email && !perfil_url) {
      const newUser = await prisma.userCreated
        .create({
          data: {
            name: name,
          },
        })
        .catch(() => {
          throw new AppError('An error occurred while creating the user');
        });

      if (newUser) {
        return newUser;
      }
    }

    const checkingForExists = await new GetUserByEmailService().execute({
      email: email,
    });

    if (checkingForExists) {
      throw new AppError('user already exists', 400);
    }
    const newUser = await prisma.userCreated
      .create({
        data: {
          name: name,
          email: email,
          perfil_url: perfil_url,
        },
      })
      .catch(() => {
        throw new AppError('An error occurred while creating the user', 500);
      });
    if (newUser) {
      return newUser;
    }
  }
}
