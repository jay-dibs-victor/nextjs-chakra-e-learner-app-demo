const express = require('express');
const { signup, login, verifyOtp } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/signin', login);
router.post('/verify-otp', verifyOtp);
router.post('/verification', verifyOtp); // Alias for verify-otp
router.post('/forgot-password', (req, res) => res.json({ message: 'Forgot password endpoint (stub)' }));
router.post('/reset-password', (req, res) => res.json({ message: 'Reset password endpoint (stub)' }));
router.post('/verification/resend', (req, res) => res.json({ message: 'Resend verification endpoint (stub)' }));
router.get('/verification', (req, res) => res.json({ message: 'Token verification endpoint (stub)' }));
router.post('/verification/token', (req, res) => res.json({ message: 'Token verification endpoint (stub)' }));

module.exports = router;
