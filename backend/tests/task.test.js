
const request = require('supertest');
const express = require('express');
const taskRouter = require('../routes/taskRoute');
const userRouter = require('../routes/userRouts');

const app = express();
app.use(express.json());
app.use('/tasks', taskRouter);
app.use('/users', userRouter);

describe('Task Routes', () => {
  let userId;
  let taskId;
  let subtaskId;

  beforeAll(async () => {
    // Create a user to be used in the tests
    const res = await request(app)
      .post('/users/signup')
      .send({
        name: 'Test User',
        email: 'test-task@example.com',
        password: 'password123',
      });
    userId = res.body.userId;
  });

const getTaskRequestBody = (userId) => ({
  user_id: userId,
  title: 'Test Task',
  description: 'This is a test task',
  due_date: '2025-12-31',
  priority: 'High',
  status: 'Pending',
  recurrence: 'None',
  notes: 'Some notes',
});

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/tasks')
        .send(getTaskRequestBody(userId));
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      taskId = res.body.id;
    });
  });

  describe('GET /tasks/:userId', () => {
    it('should get all tasks for a user', async () => {
      const res = await request(app).get(`/tasks/${userId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('tasks');
      expect(Array.isArray(res.body.tasks)).toBe(true);
    });
  });

  describe('PUT /tasks/:id', () => {
    it('should update a task', async () => {
      const res = await request(app)
        .put(`/tasks/${taskId}`)
        .send({
          title: 'Updated Test Task',
          description: 'This is an updated test task',
          due_date: '2026-01-15',
          priority: 'Medium',
          status: 'In Progress',
          recurrence: 'Daily',
          notes: 'Some updated notes',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Task updated successfully');
    });
  });

  describe('POST /tasks/subtask', () => {
    it('should add a subtask to a task', async () => {
      const res = await request(app)
        .post('/tasks/subtask')
        .send({
          task_id: taskId,
          name: 'Test Subtask',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      subtaskId = res.body.id;
    });
  });



  describe('DELETE /tasks/subtask/:id', () => {
    it('should delete a subtask', async () => {
      const res = await request(app).delete(`/tasks/subtask/${subtaskId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Subtask deleted successfully');
    });
  });

  describe('PUT /tasks/:id/complete', () => {
    it('should mark a task as complete', async () => {
      const res = await request(app)
        .put(`/tasks/${taskId}/complete`)
        .send({ status: 'Completed' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Task marked as complete');
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a task', async () => {
      const res = await request(app).delete(`/tasks/${taskId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Task deleted successfully');
    });
  });
});
