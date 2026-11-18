// middleware/auth.js
// Middleware to authenticate JWT tokens and protect private backend routes.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if token is provided in the Authorization header (Format: Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the token part after 'Bearer '
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token signature using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user from the ID in the decoded token payload
      // Exclude the password field using .select('-password') for security
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User belonging to this token no longer exists.'
        });
      }

      // Allow the request to proceed to the route handler
      next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication token. Please log in again.'
      });
    }
  }

  // If no token was found in the header
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.'
    });
  }
};

module.exports = { protect };
