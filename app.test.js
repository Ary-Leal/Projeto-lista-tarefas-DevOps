// app.test.js
const request = require('supertest');
const app = require('./app');
const fs = require('fs');

beforeAll(done => {
  if (fs.existsSync('./database.db')) {
    fs.unlinkSync('./database.db');
  }
  done();
});

describe('Tasks API', () => {
  test('should add a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task added successfully');
  });

  test('should get tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('title', 'Test Task');
  });
});