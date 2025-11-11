const express = require("express");
const { verifyToken } = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// 🟢 Lấy thông tin cá nhân
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy thông tin" });
  }
});

// 🟡 Cập nhật thông tin cá nhân
router.put("/", verifyToken, async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address },
      { new: true }
    );
    res.json({ message: "Cập nhật thành công", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật thông tin" });
  }
});

module.exports = router;
