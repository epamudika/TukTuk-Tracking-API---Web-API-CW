const request = require('supertest'); 
const mongoose = require('mongoose');
const app = require('../server');

describe('Tuktuk Management API', () => {
  
  it('should return 401 for unauthorized access to tuk-tuks list', async () => {
    const res = await request(app).get('/api/tuktuks');
    expect(res.statusCode).toEqual(401); 
  });

  it('should return 401 for unauthorized access to specific vehicle', async () => {
    const res = await request(app).get('/api/tuktuks/INVALID_ID_123');
    expect(res.statusCode).toEqual(401);
  });
});


afterAll(async () => {
  await mongoose.connection.close();
});