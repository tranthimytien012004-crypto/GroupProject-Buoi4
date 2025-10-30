// controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User'); // 🔹 Import model User

// 🟢 Đăng ký
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email trùng
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email đã tồn tại!' });

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: 'Đăng ký thành công',
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Email không tồn tại!' });

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Sai mật khẩu!' });

    res.status(200).json({
      message: 'Đăng nhập thành công',
      user,

    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
