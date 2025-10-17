
const request = require('supertest');
const express = require('express');
const router = require('../routes/budgetRoute');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Budget Routes', () => {
  let budgetId;

  describe('POST /', () => {
    it('should create a new budget entry', async () => {
      const res = await request(app)
        .post('/')
        .send({
          user_id: 1,
          amount: 1000,
          area: 'Food',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Budget created successfully');
      budgetId = res.body.budgetId;
    });
  });

  describe('GET /:userId', () => {
    it('should return all budget entries for a user', async () => {
      const res = await request(app).get('/1');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('PUT /:id', () => {
    it('should update a budget entry', async () => {
      const res = await request(app)
        .put(`/${budgetId}`)
        .send({
          amount: 1200,
          area: 'Groceries',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Budget updated successfully');
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a budget entry', async () => {
      const res = await request(app).delete(`/${budgetId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Budget deleted successfully');
    });
  });
});
