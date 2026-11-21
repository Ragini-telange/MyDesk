// server.js
// Main entry point for the MyDesk backend API server.

// Fix for Node.js DNS resolution issue with MongoDB Atlas SRV records on Windows local development
// Windows-only: Do not force public DNS servers on Render Linux containers
if (process.platform === 'win32' && process.env.NODE_ENV !== 'production') {
  try {
    const dns = require('node:dns');
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (err) {
    // Ignore DNS override errors
  }
}

const express = require('express');
const cors = require('cors');
const path = require('node:path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const taskRoutes = require('./routes/tasks');
const dsaRoutes = require('./routes/dsa');
const githubRoutes = require('./routes/github');

// Load environment variables from .env file (always relative to server folder)
dotenv.config({ path: path.join(__dirname, '.env') });

// Initialize the Express application
const app = express();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// ----------------------
// MIDDLEWARE
// ----------------------

// Configure CORS: Allow deployed frontend (CLIENT_URL), local development, and Chrome extension
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000'
];

if (process.env.CLIENT_URL) {
  process.env.CLIENT_URL.split(',').forEach((url) => {
    const trimmed = url.trim().replace(/\/+$/, '');
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, Render health checks)
    if (!origin) return callback(null, true);

    // Allow configured origins, local development, or Chrome extensions
    if (
      allowedOrigins.includes(origin) ||
      origin.startsWith('chrome-extension://') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }

    // Allow Vercel preview URLs
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy blocked access from origin: ${origin}`));
  },
  credentials: true
}));

// Parse incoming JSON payloads in request bodies
app.use(express.json());

// ----------------------
// ROUTES
// ----------------------

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Mount dashboard routes
app.use('/api/dashboard', dashboardRoutes);

// Mount task routes
app.use('/api/tasks', taskRoutes);

// Mount DSA code execution routes (Phase 7.3)
app.use('/api/dsa', dsaRoutes);

// Mount GitHub synchronization routes (Phase 8)
app.use('/api/github', githubRoutes);

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
