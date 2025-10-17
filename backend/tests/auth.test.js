
const request = require('supertest');
const express = require('express');
const router = require('../routes/userRouts');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Auth Routes', () => {
  describe('POST /signup', () => {
    it('should create a new user and then return 400 if email already exists', async () => {
      // Create a new user
      const res1 = await request(app)
        .post('/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });
      expect(res1.statusCode).toEqual(201);
      expect(res1.body).toHaveProperty('message', 'User registered successfully');

      // Try to create another user with the same email
      const res2 = await request(app)
        .post('/signup')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        });
      expect(res2.statusCode).toEqual(400);
      expect(res2.body).toHaveProperty('error', 'Email already registered');
    });
  });

  describe('POST /login', () => {
    it('should login the user', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Login successful');
    });

    it('should return 401 for invalid credentials', async () => {
      const res = await request(app)
        .post('/login')
        .send({
          email: 'wrong@example.com',
          password: 'wrongpassword',
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('error', 'Invalid email or password');
    });
  });

  describe('GET /', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /logout', () => {
    it('should logout the user', async () => {
      const res = await request(app).post('/logout');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Logout successful');
    });
  });
});
