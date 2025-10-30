// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Đăng ký
exports.signup = async (req, res) => {const User = require('../models/User');
const bcrypt = require('bcrypt');
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công', user: { id: newUser._id, name, email } });
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
    const payload = { id: user._id }; // bạn có thể thêm role nếu muốn
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

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

  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email đã tồn tại' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Đăng nhập thành công', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Đăng xuất
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Đăng xuất thành công' });
};
