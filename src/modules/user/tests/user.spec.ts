import { test, expect, describe } from 'vitest';
import axios, { AxiosError } from 'axios';

describe('http Tests', () => {
  test('Must not create a new user', () => {
    const data = { name: '', email: '', perfil_url: '' };

    const req = async () => {
      return (await axios.post('http://localhost:4000/user/create', data)).data;
    };

    expect(req()).rejects.toThrow(/Request failed with status code 400/);
  });

  test('Should list all users', async () => {
    const listUsers = await axios.get('http://localhost:4000/user/list');
    const res = listUsers.status;

    expect(res).toEqual(200);
  });

  test('Must get a user with the same email', async () => {
    const getUser = await axios.get(
      'http://localhost:4000/user/get-by-email/arison@gmail.com'
    );
    const data = getUser.data;
    expect(data.email).toEqual('arison@gmail.com');
  });

  test('Must get a user with id', async () => {
    const getUser = await axios.get(
      'http://localhost:4000/user/get-by-id/clg9bojkn0000vzs0cx4ylees'
    );
    const status = getUser.status;
    const name = getUser.data.name;
    expect(status).toEqual(200);
    expect(name).toEqual('Arison Reis');
  });

  test('Must create a new  user', async () => {
    const data = {
      name: 'jubileu',
      email: 'jubileu@gmail.com',
    };
    await axios
      .post('http://localhost:4000/user/create', data)
      .then((response) => {
        expect(response.status).toEqual(201);
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(AxiosError);
      });
  });

  test('Should delete the user', async () => {
    expect.assertions(1);
    await axios
      .delete('http://localhost:4000/user/delete/clgaktxhm0000vzkk8ojmrcqn')
      .then((res) => {
        expect(res.status).toEqual(202);
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(AxiosError);
      });
  });
});
