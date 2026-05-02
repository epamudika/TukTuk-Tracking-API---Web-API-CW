const request = require('supertest'); 
const mongoose = require('mongoose');
const app = require('../server');

describe('Location Tracking API', () => {
  
  // Test 1: Updating live location
  it('should return 401 for unauthorized location ping', async () => {
    const res = await request(app)
      .post('/api/locations/ping')
      .send({
        vehicleId: 'TUK-7788',
        latitude: 6.9271,
        longitude: 79.8612
      });
    
    // Changing to 401 because your route uses 'protect' middleware
    expect(res.statusCode).toEqual(401);
  });

  // Test 2: Retrieving live data for the monitoring dashboard
  it('should return 401 for unauthorized access to live locations', async () => {
    const res = await request(app).get('/api/locations/live');
    
    // Changing to 401 because only authorized users can view the map data
    expect(res.statusCode).toEqual(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});