const request = require('supertest');
const express = require('express');
const learningRouter = require('../routes/learningRoutes');
const userRouter = require('../routes/userRouts');

const app = express();
app.use(express.json());
app.use('/learning', learningRouter);
app.use('/users', userRouter);

describe('Learning Routes', () => {
  let userId;
  let learningId;

  beforeAll(async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        name: 'Test User',
        email: 'test-learning@example.com',
        password: 'password123',
      });
    userId = res.body.userId;
  });

  describe('POST /learning', () => {
    it('should create a new learning entry', async () => {
      const res = await request(app)
        .post('/learning')
        .send({
          user_id: userId,
          title: 'Learn Node.js',
          description: 'Complete Node.js course on Udemy',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Learning created successfully');
      learningId = res.body.learningId;
    });
  });

  describe('GET /learning/:userId', () => {
    it('should return all learning entries for a user', async () => {
      const res = await request(app).get(`/learning/${userId}`);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('PUT /learning/:id', () => {
    it('should update a learning entry', async () => {
      const res = await request(app)
        .put(`/learning/${learningId}`)
        .send({
          title: 'Learn Express.js',
          description: 'Complete Express.js course on Udemy',
          progress: 50,
          completed: false,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Learning updated successfully');
    });
  });

  describe('DELETE /learning/:id', () => {
    it('should delete a learning entry', async () => {
      const res = await request(app).delete(`/learning/${learningId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Learning deleted successfully');
    });
  });
});