const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Ensure server.js uses module.exports = app;

describe('Auth API Unit Tests', () => {
  
  /**
   * Test 1: Verify Swagger Documentation Access
   * We use '/api-docs/' with the trailing slash to avoid the 301 redirect error.
   */
  it('should return a 200 status for the documentation page', async () => {
    const res = await request(app).get('/api-docs/');
    expect(res.statusCode).toEqual(200);
  });

  /**
   * Test 2: Verify Protected Routes (Unauthorized Access)
   * This ensures your JWT middleware is working as intended.
   */
  it('should return 401 when accessing a protected route without a token', async () => {
    const res = await request(app).get('/api/admin/dashboard');
    expect(res.statusCode).toEqual(401);
  });

  /**
   * Test 3: Health Check
   * Basic test to ensure the server logic is responding.
   */
  it('should respond to a basic health check or root route', async () => {
    const res = await request(app).get('/');
    // Adjust expected status (200 or 404) based on whether you have a root '/' route defined
    expect([200, 404]).toContain(res.statusCode);
  });

});

/**
 * Global Teardown:
 * This is critical to prevent the "worker process failed to exit" error.
 * It closes the connection to your MongoDB Atlas cluster (TuktukDB) after tests finish.
 */
afterAll(async () => {
  await mongoose.connection.close();
});