import type { Request, Response } from 'express';
import { prisma } from '../../../shared/prisma';
import type { IUserData } from '../../../shared/types/UserDatacreate';

export class CreateUserService {
  async execute({ name, email, perfil_url }: IUserData) {
    
  }
}
