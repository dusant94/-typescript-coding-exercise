const express = require('express');
const { register, login } = require('../controllers/authController');
const { getMessages, sendMessage } = require('../controllers/chatController');
const { body } = require('express-validator');
const { checkAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Authentication routes
router.post('/auth/register',
  // Validate input
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  register
);

router.post('/auth/login',
  // Validate input
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  login
);

// Chat routes (protected by authentication middleware)
router.use('/', checkAuth); // Apply authentication middleware to all /chat routes

router.get('/messages', getMessages);

router.post('/message/send', sendMessage);

module.exports = router;