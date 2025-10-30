

// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // ✅ Đúng đường dẫn

// Đăng ký
router.post('/signup', authController.signup);

// Đăng nhập
router.post('/login', authController.login);

// Đăng xuất
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Đăng xuất thành công!' });
});

module.exports = router;
