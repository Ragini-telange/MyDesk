// routes/tasks.js
// Express router providing student task management (CRUD) APIs.

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

// Apply JWT authentication middleware to all task routes
router.use(protect);

// -------------------------------------------------------------
// @route   GET /api/tasks
// @desc    Get all tasks belonging to the authenticated student
// @access  Private (Protected by JWT)
// -------------------------------------------------------------
router.get('/', async (req, res, next) => {
  try {
    // Fetch only the logged-in student's tasks, ordered newest first
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// @route   POST /api/tasks
// @desc    Create a new study task for the authenticated student
// @access  Private (Protected by JWT)
// -------------------------------------------------------------
router.post('/', async (req, res, next) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    // Validate title input
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a task title.'
      });
    }

    // Create the task attached strictly to req.user._id (never trust frontend user IDs)
    const task = await Task.create({
      user: req.user._id,
      title: title.trim(),
      description: description ? description.trim() : '',
      dueDate: dueDate ? new Date(dueDate) : null,
      priority: priority && ['High', 'Medium', 'Low'].includes(priority) ? priority : 'Medium',
      completed: false
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully!',
      task
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. ')
      });
    }
    next(error);
  }
});

// -------------------------------------------------------------
// @route   PUT /api/tasks/:id
// @desc    Update task details or toggle completion status
// @access  Private (Protected by JWT)
// -------------------------------------------------------------
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format.'
      });
    }

    // Find the task by ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.'
      });
    }

    // Ensure student ownership (authorization check)
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own tasks.'
      });
    }

    const { title, description, dueDate, priority, completed } = req.body;

    // Update fields if provided
    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Task title cannot be empty.'
        });
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate ? new Date(dueDate) : null;
    }

    if (priority !== undefined) {
      if (!['High', 'Medium', 'Low'].includes(priority)) {
        return res.status(400).json({
          success: false,
          message: 'Priority must be High, Medium, or Low.'
        });
      }
      task.priority = priority;
    }

    if (completed !== undefined) {
      task.completed = Boolean(completed);
    }

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully!',
      task: updatedTask
    });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// @route   DELETE /api/tasks/:id
// @desc    Delete a task belonging to the authenticated student
// @access  Private (Protected by JWT)
// -------------------------------------------------------------
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format.'
      });
    }

    // Find the task by ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.'
      });
    }

    // Ensure student ownership (authorization check)
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own tasks.'
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully!'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
