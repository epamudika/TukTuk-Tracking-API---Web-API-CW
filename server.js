require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Import Routes (Ensured all paths match your src/routes directory)
const authRoutes = require('./src/routes/auth');
const tuktukRoutes = require('./src/routes/tuktuk');
const locationRoutes = require('./src/routes/location'); 
const adminRoutes = require('./src/routes/admin');
const provinceRoutes = require('./src/routes/provinces');
const districtRoutes = require('./src/routes/districts');
const policeStationRoutes = require('./src/routes/policeStations');

// Create Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Configuration
// Locate this block in your server.js and replace it completely:

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
      { url: 'http://localhost:5000', description: 'Local Development Server' },
      { url: 'https://tuktuk-tracking-api-web-api-cw-erandip.onrender.com', description: 'Production Server (Render)' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        PoliceStation: {
          type: 'object',
          required: ['name', 'districtCode'],
          properties: {
            _id: { type: 'string', description: 'The auto-generated id' },
            name: { type: 'string', description: 'The name of the station' },
            districtCode: { type: 'string', description: 'The district code' }
          },
          example: {
            _id: "60d0fe4f5311236168a109ca",
            name: "Bambalapitiya Police Station",
            districtCode: "CMB"
          }
        }
      }
    },
    security: [{ bearerAuth: [] }],
    paths: {
      '/api/police-stations': {
        get: {
          summary: 'Get all police stations',
          tags: ['Police Stations'],
          responses: {
            200: {
              description: 'Success',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/PoliceStation' }
                  }
                }
              }
            },
            500: { description: 'Internal server error' }
          }
        },
        post: {
          summary: 'Create a police station',
          tags: ['Police Stations'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PoliceStation' }
              }
            }
          },
          responses: {
            201: {
              description: 'Created',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/PoliceStation' }
                }
              }
            },
            400: { description: 'Bad request (missing fields)' },
            500: { description: 'Internal server error' }
          }
        }
      }
    }
  },
  // Keep this empty array so it doesn't try to parse broken JSDoc blocks anymore
  apis: [], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI is missing in your .env file!');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected successfully.'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1); // Stop the app if it cannot connect to the database
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tuktuks', tuktukRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/provinces', provinceRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/police-stations', policeStationRoutes);

// Home Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'TukTuk Tracking API is running...',
    docs: '/api-docs'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;