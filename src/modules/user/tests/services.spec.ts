import { CreateUserService } from '../services/createUserService';
import { DeleteUserService } from '../services/deleteUserService';
import { GetUserByEmailService } from '../services/getUserByEmailService';
import { GetUserService } from '../services/getUserService';

describe('Testing the Database Services', () => {
  test('must instantiate the Create User service', () => {
    const createUserService = new CreateUserService();
    expect(createUserService).toBeInstanceOf(CreateUserService);
  });

  test('must instantiate the Delete User service', () => {
    const deleteUserService = new DeleteUserService();

    expect(deleteUserService).toBeInstanceOf(DeleteUserService);
  });

  test('must instantiate the Get User By Email User service', () => {
    const getUserByEmailService = new GetUserByEmailService();
    expect(getUserByEmailService).toBeInstanceOf(GetUserByEmailService);
  });

  test('must instantiate the Get User Service service', () => {
    const getUserService = new GetUserService();

    expect(getUserService).toBeInstanceOf(GetUserService);
  });
});
