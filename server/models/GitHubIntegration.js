// models/GitHubIntegration.js
// Mongoose schema and model for Student GitHub OAuth connections and repository configurations.

const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/crypto');

const gitHubIntegrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Integration must be associated with a student user'],
      unique: true
    },
    githubId: {
      type: String,
      required: [true, 'GitHub account ID is required']
    },
    username: {
      type: String,
      required: [true, 'GitHub username is required']
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    profileUrl: {
      type: String,
      default: ''
    },
    // Sensitive OAuth access token: encrypted at rest with AES-256-GCM.
    // select: false ensures it is never returned in standard queries.
    encryptedAccessToken: {
      type: String,
      required: [true, 'Access token is required'],
      select: false
    },
    targetRepo: {
      type: String,
      default: 'MyDesk-DSA-Solutions'
    },
    targetBranch: {
      type: String,
      default: 'main'
    },
    isConnected: {
      type: Boolean,
      default: true
    },
    connectedAt: {
      type: Date,
      default: Date.now
    },
    lastSyncedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

// Method to safely encrypt and assign the access token
gitHubIntegrationSchema.methods.setAccessToken = function (plainToken) {
  this.encryptedAccessToken = encrypt(plainToken);
};

// Method to decrypt and retrieve the access token for backend API calls
gitHubIntegrationSchema.methods.getAccessToken = function () {
  if (!this.encryptedAccessToken) {
    throw new Error('Access token is missing or not selected.');
  }
  return decrypt(this.encryptedAccessToken);
};

module.exports = mongoose.model('GitHubIntegration', gitHubIntegrationSchema);
