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
