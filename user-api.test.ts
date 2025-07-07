import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_GATEWAY_URL || 'http://localhost:3000',
});

let createdUserID: string;

describe('User API', () => {
  it('should create a user', async () => {
    const response = await api.post('/v1/users', {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
    });

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('userID');
    createdUserID = response.data.userID;
  });

  it('should list users', async () => {
    const response = await api.get('/v1/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it('should get user by ID', async () => {
    const response = await api.get(`/v1/users/${createdUserID}`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('userID', createdUserID);
  });

  it('should update user', async () => {
    const response = await api.put(`/v1/users/${createdUserID}`, {
      name: 'John Updated',
      email: 'john@example.com',
      phone: '1234567890',
      address: '123 Main St',
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('name', 'John Updated');
  });

  it('should delete user', async () => {
    const response = await api.delete(`/v1/users/${createdUserID}`);
    expect(response.status).toBe(200);
    expect(response.data).toBe('Deleted');
  });
});
