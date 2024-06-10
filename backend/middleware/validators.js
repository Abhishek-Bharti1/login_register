const { body } = require('express-validator');

exports.registerValidation = [
  body('username', 'Username is required').trim().escape().not().isEmpty(),
  body('email', 'Please include a valid email').isEmail().normalizeEmail(),
  body('password', 'Password must be 6 or more characters').isLength({ min: 6 }).trim().escape()
];

exports.loginValidation = [
  body('email', 'Please include a valid email').isEmail().normalizeEmail(),
  body('password', 'Password is required').exists().trim().escape()
];
