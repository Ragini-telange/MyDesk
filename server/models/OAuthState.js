// models/OAuthState.js
// One-time expiring state token model to prevent CSRF attacks during GitHub OAuth flows.

const mongoose = require('mongoose');

const oAuthStateSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // Automatically removed from MongoDB after 10 minutes (600 seconds)
  }
});

module.exports = mongoose.model('OAuthState', oAuthStateSchema);
