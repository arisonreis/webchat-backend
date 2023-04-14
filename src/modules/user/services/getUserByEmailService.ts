import { AppError } from '../../../shared/errors';
import { prisma } from '../../../shared/prisma';

interface IDataEmail {
  email: string;
}

export class GetUserByEmailService {
  async execute({ email }: IDataEmail) {
    if (email) {
      const searchUser = await prisma.user
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
}
