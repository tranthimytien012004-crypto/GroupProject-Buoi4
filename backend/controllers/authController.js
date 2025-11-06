// controllers/authController.js
console.log('🔑 JWT_SECRET hiện tại:', process.env.JWT_SECRET);

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🟢 Đăng ký (Sign Up)
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: 'Đăng ký thành công',
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    console.error('❌ Lỗi signup:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Đăng nhập (Login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra user tồn tại
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    // So sánh password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

    res.json({ message: 'Đăng nhập thành công', token });
  } catch (err) {
    console.error('❌ Lỗi login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟢 Đăng xuất (Logout)
exports.logout = (req, res) => {
  // Logout phía backend chỉ trả message, client xóa token
  res.json({ message: 'Đăng xuất thành công' });
};
