// routes/dashboard.js
// Express router providing authenticated student dashboard data.

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task');
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

    // 2. Query real task statistics from MongoDB for the authenticated student
    const totalTasks = await Task.countDocuments({ user: req.user._id });
    const completedTasks = await Task.countDocuments({ user: req.user._id, completed: true });
    const pendingTasks = await Task.countDocuments({ user: req.user._id, completed: false });

    let taskStatus = 'No tasks created yet';
    let taskMessage = 'No study tasks found. Create your daily study goals in the To-Do module.';

    if (totalTasks > 0) {
      if (pendingTasks === 0) {
        taskStatus = 'All tasks completed';
        taskMessage = 'Great job! All your study tasks are currently completed.';
      } else {
        taskStatus = `${pendingTasks} pending`;
        taskMessage = `You have ${pendingTasks} task${pendingTasks > 1 ? 's' : ''} remaining in your planner.`;
      }
    }

    // 3. Prepare real dashboard metrics
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
          total: totalTasks,
          pending: pendingTasks,
          completed: completedTasks,
          status: taskStatus,
          message: taskMessage
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
