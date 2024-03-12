const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();

// Initialize the cookie-parser middleware
router.use(cookieParser());

/**
 * Transforms the sign-up request data to match the backend's expected format.
 * 
 * @param {SignUpRequest} signUpData - The original sign-up request data.
 * 
 * @returns {Object} The transformed sign-up request data with the following changes:
 * - `firstName` is mapped to `first_name`
 * - `lastName` is mapped to `last_name`
 * - `email` is mapped to `username`
 * - All other properties remain unchanged.
 * 
 * @example
 * const originalData = {
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   email: 'john.doe@example.com',
 *   password: 'securePassword123'
 * };
 * 
 * const transformedData = transformSignUpRequestForBackend(originalData);
 * console.log(transformedData);
 * // Outputs:
 * // {
 * //   firstName: 'John',
 * //   lastName: 'Doe',
 * //   email: 'john.doe@example.com',
 * //   password: 'securePassword123',
 * //   first_name: 'John',
 * //   last_name: 'Doe',
 * //   username: 'john.doe@example.com'
 * // }
 */
// Middleware to check if the user is authenticated
function requireAuth(req, res, next) {
  const isAuthenticated = req.cookies.isAuthenticated === 'true';

  if (isAuthenticated) {
    next(); // User is authenticated, continue to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated, send a 401 Unauthorized response
  }
}

// Route to set a cookie when a user logs in
router.post('/login', (req, res) => {
  // You should perform authentication here, and if successful, set the cookie.
  // For demonstration purposes, let's assume the user is authenticated.
  res.cookie('isAuthenticated', 'true');
  res.status(200).json({ message: 'Logged in successfully' });
});

// Route to log out and clear the cookie
router.post('/logout', (req, res) => {
  res.clearCookie('isAuthenticated');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Protected route that requires authentication
router.get('/protected', requireAuth, (req, res) => {
  res.status(200).json({ message: 'Authentication successful' });
});

module.exports = router;
