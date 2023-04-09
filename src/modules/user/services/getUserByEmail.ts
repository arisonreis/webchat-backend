import { AppError } from '../../../shared/errors';
import { prisma } from '../../../shared/prisma';

interface IDataEmail {
  email: string;
}

export class GetUserByEmail {
  async execute({ email }: IDataEmail) {

    const searchUser = await prisma.userCreated
      .findUnique({
        where: {
          email: email,
        },
      })
      .catch(() => {
        throw new AppError('An error occurred while fetching the user', 500);
      });
    if (searchUser) {
      return searchUser;
    }
  }
}