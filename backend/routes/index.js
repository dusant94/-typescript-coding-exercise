const express = require('express');
const { register, login } = require('../controllers/authController');
const { getMessages, sendMessage } = require('../controllers/chatController');
const { body } = require('express-validator');
const { checkAuth } = require('../middlewares/authMiddleware');

const router = express.Router();


router.post('/auth/login',
  // Validate input
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  login
);

// Chat routes (protected by authentication middleware)
router.use('/chat', checkAuth); // Apply authentication middleware to all /chat routes

router.get('/chat/messages', getMessages);

router.post('/chat/message/send', sendMessage);

module.exports = router;