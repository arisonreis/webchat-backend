import { test, expect, describe } from 'vitest';
import { CreateUserService } from '../services/createUserService';
import { GetUserByEmail } from '../services/getUserByEmail';
import axios from 'axios';
import { AppError } from '../../../shared/errors';

describe('http Tests', () => {
  test('Must not create a new user', async () => {
    const data = {
      name: '',
      email: '',
      perfil_url: '',
    };
    const createUser = async () => {
      return (await axios.post('http://localhost:4000/user/create', data))
        .status;
    };
    expect(createUser()).resolves.toBe(400);
  });
});
