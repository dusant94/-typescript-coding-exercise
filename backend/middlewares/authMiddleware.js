const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // Ensure this matches the one used in authController

// Middleware to check for valid JWT token
exports.checkAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log(decoded)
    req.user = decoded;
    next();
  });
};