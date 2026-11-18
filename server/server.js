// server.js
// Main entry point for the MyDesk backend API server.

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// ----------------------
// MIDDLEWARE
// ----------------------

// Enable Cross-Origin Resource Sharing (CORS) so our React frontend can talk to this server
app.use(cors());

// Parse incoming JSON payloads in request bodies
app.use(express.json());

// ----------------------
// ROUTES
// ----------------------

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Root welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MyDesk API',
    status: 'online',
    version: '1.0.0'
  });
});

// Health-check endpoint
// Used to verify that the server is alive and reports MongoDB connection state
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  
  // Connection states in Mongoose:
  // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  const dbStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };

  const dbState = dbStatusMap[mongoose.connection.readyState] || 'Unknown';

  res.status(200).json({
    success: true,
    message: 'MyDesk Backend server is running smoothly',
    timestamp: new Date().toISOString(),
    database: {
      status: dbState,
      isConnected: mongoose.connection.readyState === 1
    }
  });
});

// ----------------------
// ERROR HANDLING
// ----------------------

// 404 Not Found Middleware (catches any request that doesn't match a defined route)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler Middleware
// Catches any unexpected internal errors and returns a clean JSON error response
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ----------------------
// START SERVER
// ----------------------
app.listen(PORT, () => {
  console.log(`🚀 MyDesk Server is running at http://localhost:${PORT}`);
  console.log(`🩺 Health check available at: http://localhost:${PORT}/api/health`);
});
