import { AppError } from '../../../shared/errors';
import { prisma } from '../../../shared/prisma';
import { GetUserService } from './getUserService';
interface IUserIdParams {
  id: string;
}

export class DeleteUserService {
  async execute({ id }: IUserIdParams) {
    const userExists = await new GetUserService().execute({ id: id });
    if (userExists) {
      const deleting = await prisma.userCreated
        .delete({
          where: {
            id: id,
          },
        })
        .catch(() => {
          throw new AppError('An error occurred while deleting  the user');
        });

      if (deleting) {
        return true;
      }
    }
  }
}
