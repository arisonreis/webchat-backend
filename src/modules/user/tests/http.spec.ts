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

  test('Should delete the user with Token', async () => {
    expect.assertions(1);

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZ2N2d202cjAwMDB2emNzOHUzMDd5cWYiLCJpYXQiOjE2ODEyNTUxNDcsImV4cCI6MTY4MTg1OTk0N30.KV_ouRRfZPt7Hz6uA8oJkdbMi5yz-St4ni2Gr-cSAUU';
    await axios
      .delete('http://localhost:4000/user/delete', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        expect(res.status).toEqual(202);
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(AxiosError);
      });
  });

  test('Shold get a user with authorization Token', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZ2N2d202cjAwMDB2emNzOHUzMDd5cWYiLCJpYXQiOjE2ODEyNTUxNDcsImV4cCI6MTY4MTg1OTk0N30.KV_ouRRfZPt7Hz6uA8oJkdbMi5yz-St4ni2Gr-cSAUU';

    await axios
      .get('http://localhost:4000/user/get', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        expect(res.status).toEqual(200);
      })
      .catch((err) => {
        expect(err).toBeInstanceOf(AxiosError);
      });
  });
});
