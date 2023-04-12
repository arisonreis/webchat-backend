import { UserController } from '../controllers/userController';

describe('Controllers tests ', () => {
  test('must instantiate the controller', () => {
    const useController = new UserController();
    expect(useController).toBeInstanceOf(UserController);
  });
});
