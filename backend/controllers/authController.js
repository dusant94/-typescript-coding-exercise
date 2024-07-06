const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Secret key for JWT
const JWT_SECRET = 'your-secret-key'; // Change this to a secure, random string

// Mock user database
// This should be replaced with a real database in production
const users = [
  {
    username: 'test',
    password: 'password' 
  }
];

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Find user
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Check password
  // const isMatch = await bcrypt.compare(password, user.password); 
  // if (!isMatch) {

  if (password !== user.password) { // just for testing
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Create JWT token
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
};