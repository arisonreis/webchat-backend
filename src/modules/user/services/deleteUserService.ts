import { AppError } from '../../../shared/errors';
import { prisma } from '../../../shared/prisma';
import {  getUserService} from './getUserService';
interface IUserIdParams {
  id: string;
}

export class DeletUserService {
  async execute({ id }: IUserIdParams) {
    const userExists = await new getUserService().execute({ id: id });
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
