const express = require('express');
const router = express.Router();
const { registerUser, loginUser, protectedRoute } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../middleware/validators');
const auth = require('../middleware/auth');

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.get('/protected', auth, protectedRoute);

module.exports = router;
