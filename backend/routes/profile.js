const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/auth'); // middleware kiểm tra token

// 🟢 Xem thông tin cá nhân
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    res.json(user);
  } catch (error) {
    console.error(error); // log server
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// 🟠 Cập nhật thông tin cá nhân
router.put('/', verifyToken, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    // Chỉ cập nhật những field hợp lệ
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (phone) updatedFields.phone = phone;
    if (address) updatedFields.address = address;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedFields },
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'Người dùng không tồn tại' });

    res.json({ message: 'Cập nhật thành công', user: updatedUser });
  } catch (error) {
    console.error(error); // log server
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
