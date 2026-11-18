// routes/auth.js
// Express router handling student registration, login, and user profile verification.

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Helper function to generate a signed JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// -------------------------------------------------------------
// @route   POST /api/auth/register
// @desc    Register a new student account
// @access  Public
// -------------------------------------------------------------
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and password.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    // 2. Check if a user with this email already exists
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please login instead.'
      });
    }

    // 3. Create the student record (password hashing handled by Mongoose pre-save hook)
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password
    });

    // 4. Generate JWT token
    const token = generateToken(user._id);

    // 5. Send success response (never expose the hashed password)
    res.status(201).json({
      success: true,
      message: 'Student account registered successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    // Handle Mongoose validation errors
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
// @route   POST /api/auth/login
// @desc    Authenticate student and return JWT token
// @access  Public
// -------------------------------------------------------------
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validate inputs
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    // 2. Find user by email
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password. Please check your credentials.'
      });
    }

    // 3. Compare entered password with stored hashed password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password. Please check your credentials.'
      });
    }

    // 4. Generate JWT token
    const token = generateToken(user._id);

    // 5. Send success response
    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// -------------------------------------------------------------
// @route   GET /api/auth/me
// @desc    Get currently authenticated student profile
// @access  Private (Protected by JWT)
// -------------------------------------------------------------
router.get('/me', protect, async (req, res) => {
  // req.user was populated by the protect middleware
  res.status(200).json({
    success: true,
    user: req.user
  });
});

module.exports = router;
