import { test, expect, describe } from 'vitest';
import axios from 'axios';

describe('Testing the http Router', async () => {
  test('checking that the controller is working properly for correct data', async () => {
    const fetching = await axios.post('http://localhost:4000/user/create', {
      name: 'blabla',
      email: 'blabla',
      perfil_url: 'blabla',
    });
    expect(fetching.status).toBe(200);
  });

  test('checking that the controller is working properly for bad data', async () => {
    const req = fetch('http://localhost:4000/user/create', {
      method: 'POST',
      body: JSON.stringify({
        name: '',
        email: '',
        perfil_url: '',
      }),
    });
    const status = (await req).status;

    expect(status).toBe(400);
  });
});
