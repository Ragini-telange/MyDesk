// routes/dashboard.js
// Express router providing authenticated student dashboard data.

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// -------------------------------------------------------------
// @route   GET /api/dashboard
// @desc    Get dashboard metrics and account data for the authenticated student
// @access  Private (Protected by JWT)
// -------------------------------------------------------------
router.get('/', protect, async (req, res, next) => {
  try {
    // 1. Identify student securely from verified JWT payload (attached to req.user by protect middleware)
    // We do NOT trust or accept any student ID from client-side request parameters or bodies.
    const student = await User.findById(req.user._id).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student account record not found in database.'
      });
    }

    // 2. Prepare real dashboard metrics
    // For modules whose persistent storage will be added in upcoming phases (To-Do & DSA),
    // we return honest zero counts and "Not started" status instead of fake or hardcoded numbers.
    const dashboardData = {
      success: true,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        createdAt: student.createdAt
      },
      stats: {
        dsa: {
          solvedCount: 0,
          totalCount: 100,
          status: 'Not started',
          message: 'No coding questions solved yet. Start practicing in the DSA module.'
        },
        tasks: {
          total: 0,
          pending: 0,
          completed: 0,
          status: 'No tasks created yet',
          message: 'No study tasks found. Create your daily study goals in the To-Do module.'
        },
        interviewPrep: {
          status: 'Not started',
          message: 'Explore core CS subjects (DBMS, OS, CN, OOP) to begin interview prep.'
        },
        githubSync: {
          isConnected: false,
          repoName: null,
          status: 'Not connected',
          message: 'Connect your personal GitHub account to sync solutions.'
        }
      }
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
