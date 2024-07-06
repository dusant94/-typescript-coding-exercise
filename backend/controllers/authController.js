const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Secret key for JWT
const JWT_SECRET = 'your-secret-key'; // Change this to a secure, random string

// Mock user database
// This should be replaced with a real database in production
const users = [
  {
    username: 'dusant',
    password: '1123456' 
  }
];

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
        error: 'Unauthorized'
      });
    }

    // Check password
    // Uncomment this section for real password checking with bcrypt
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    if (password !== user.password) { // just for testing
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
        error: 'Unauthorized'
      });
    }

    // Create JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};
