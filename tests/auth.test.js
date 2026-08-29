const request = require('supertest');
const app = require('../app');
const db = require('../config/db');

describe('POST /api/auth/register', () => {
  it('registers a new user and returns a token', async () => {
    const uniqueEmail = `test${Date.now()}@example.com`;

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: uniqueEmail,
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(uniqueEmail);
  });

  it('rejects registering with an already-used email', async () => {
    const uniqueEmail = `test${Date.now()}@example.com`;

    await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: uniqueEmail,
      password: 'password123'
    });

    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser2',
      email: uniqueEmail,
      password: 'password456'
    });

    expect(res.statusCode).toBe(400);
  });
});

describe('POST /api/auth/login', () => {
  const uniqueEmail = `logintest${Date.now()}@example.com`;
  const password = 'password123';

  beforeAll(async () => {
    await request(app).post('/api/auth/register').send({
      username: 'loginuser',
      email: uniqueEmail,
      password
    });
  });

  it('logs in with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: uniqueEmail, password });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(uniqueEmail);
  });

  it('rejects login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: uniqueEmail, password: 'wrongpassword' });

    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await db.promise().end();
});