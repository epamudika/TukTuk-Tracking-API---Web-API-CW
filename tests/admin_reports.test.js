const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

describe('Admin Reports API', () => {
  it('should block report access without admin credentials', async () => {
    const res = await request(app).get('/api/admin/reports');
    // Expect 401 because 'protect' and 'adminOnly' middleware are active
    expect(res.statusCode).toEqual(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});