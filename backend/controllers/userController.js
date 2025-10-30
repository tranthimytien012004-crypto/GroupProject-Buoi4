const User = require('../models/User');

// 🟢 Lấy danh sách tất cả user
exports.getUsers = async (req, res) => {
  console.log('📦 Đang lấy dữ liệu từ MongoDB...');
  try {
    const users = await User.find();
    console.log('✅ Dữ liệu trả về:', users);
    res.json(users);
  } catch (err) {
    console.error('❌ Lỗi MongoDB:', err);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Thêm user mới
exports.addUser = async (req, res) => {
  console.log('🆕 Thêm user mới:', req.body);
  try {
    const newUser = new User(req.body);
    await newUser.save();
    console.log('✅ User đã được thêm:', newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('❌ Lỗi khi thêm user:', err);
    res.status(400).json({ message: "Không thể thêm user" });
  }
};

// 🟡 Cập nhật user theo ID
exports.updateUser = async (req, res) => {
  console.log('✏️ Cập nhật user:', req.params.id);
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy user" });
    console.log('✅ User sau cập nhật:', updated);
    res.json(updated);
  } catch (err) {
    console.error('❌ Lỗi khi cập nhật user:', err);
    res.status(400).json({ message: "Không thể cập nhật user" });
  }
};

// 🔴 Xóa user theo ID
exports.deleteUser = async (req, res) => {
  console.log('🗑️ Xóa user:', req.params.id);
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy user" });
    console.log('✅ Đã xóa user:', deleted);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error('❌ Lỗi khi xóa user:', err);
    res.status(500).json({ message: "Không thể xóa user" });
  }
};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Tạo JWT token
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Đăng ký
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email trùng
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email đã tồn tại' });

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'Đăng ký thành công!',
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email }).select('+password');
    if (!user)
      return res.status(400).json({ message: 'Email không tồn tại' });

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Sai mật khẩu' });

    // Tạo JWT token
    const token = createToken(user._id);

    res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Đăng xuất
exports.logout = async (req, res) => {
  try {
    // Client sẽ xóa token => server chỉ phản hồi ok
    res.status(200).json({ message: 'Đăng xuất thành công!' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

