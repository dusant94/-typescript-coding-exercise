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

 
router.get('/chat/messages',checkAuth, getMessages);
router.post('/chat/message/send',checkAuth, sendMessage);

module.exports = router;