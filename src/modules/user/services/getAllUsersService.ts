import { AppError } from '../../../shared/errors';
import { prisma } from '../../../shared/prisma';

export class GetAllUsersService {
  async execute() {
    const users = await prisma.userCreated.findMany().catch(()=>{
      throw new AppError("An error occurred while listing users", 500)
    });
    if (users) {
      return users;
    }
  }
}
