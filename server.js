require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Import Routes
const authRoutes = require('./src/routes/auth');
const tuktukRoutes = require('./src/routes/tuktuk');
const locationRoutes = require('./src/routes/location'); 
const adminRoutes = require('./src/routes/admin');

// New Routes for Swagger visibility
const provinceRoutes = require('./src/routes/provinces');
const districtRoutes = require('./src/routes/districts');
const policeStationRoutes = require('./src/routes/policeStations');
//const anomalyRoutes = require('./src/routes/anomalies');

        

// Create Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TukTuk Tracking API',
      version: '1.0.0',
      description: 'Real-Time TukTuk Tracking API for Sri Lanka Police',
    },

    tags: [
      { name: 'Auth', description: 'Authentication — login and registration' },
      { name: 'Admin', description: 'User account management' },
      { name: 'Tuktuks', description: 'TukTuk registration and management' },
      { name: 'Locations', description: 'Real-time tracking and history' },
      { name: 'Provinces', description: 'Province administration' },
      { name: 'Districts', description: 'District administration' },
      { name: 'Police Stations', description: 'Police station administration' }
    ],

    servers: [
      {
        url: 'https://tuktuk-tracking-api-web-api-cw-erandip.onrender.com',
        description: 'Production Server (Render)'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tuktuks', tuktukRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/admin', adminRoutes);

// Register New Endpoints
app.use('/api/provinces', provinceRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/police-stations', policeStationRoutes);
//app.use('/api/anomalies', anomalyRoutes);

// Home Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'TukTuk Tracking API is running...'
    //docs: 'http://localhost:5000/api-docs'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;