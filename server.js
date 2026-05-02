require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Import Routes
const authRoutes = require('./routes/auth');
const tuktukRoutes = require('./routes/tuktuk');
const locationRoutes = require('./routes/location');
const adminRoutes = require('./routes/admin');

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
      description: 'API for Sri Lanka Police'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // THIS IS THE MISSING PIECE
        TukTuk: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            registrationNumber: { type: 'string' },
            driverName: { type: 'string' },
            driverNIC: { type: 'string' },
            province: { type: 'string' },
            district: { type: 'string' },
            isActive: { type: 'boolean' }
          }
        }
      }
    },
  },
  apis: ['./routes/*.js'], 
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

// Home Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'TukTuk Tracking API is running...',
    docs: 'http://localhost:5000/api-docs'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});