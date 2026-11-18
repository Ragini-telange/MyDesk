// config/db.js
// This file manages the connection between our Express server and the MongoDB database using Mongoose.

// Ensure reliable DNS resolution for MongoDB Atlas SRV connection strings on Windows
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.warn('⚠️  MONGODB_URI is not defined in your .env file.');
      return;
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.log('💡 Tip: Make sure your local MongoDB service is running (or check your Atlas URI in server/.env).');
    // Note: We avoid process.exit(1) so the health check endpoint still responds and helps you debug.
  }
};

module.exports = connectDB;
