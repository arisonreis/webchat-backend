import { AppError } from '../../../shared/errors';
import { prisma } from '../../../shared/prisma';

interface IUserIdParams {
  id: string;
}
export class GetUserService {
  async execute({ id }: IUserIdParams) {
    const getUser = await prisma.userCreated
      .findUnique({
        where: {
          id: id,
        },
      })
      .catch(() => {
        throw new AppError('An internal error  occurred was find the user');
      });

    if (getUser) {
      return getUser;
    } else {
      throw new AppError('User not found');
    }
  }
}
