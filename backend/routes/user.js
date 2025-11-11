const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken, isAdmin } = require("../middleware/auth");

// 🟢 Lấy danh sách user (chỉ admin)
router.get("/", verifyToken, isAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// 🟢 Thêm user (chỉ admin)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email đã tồn tại!" });

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.json({ message: "Tạo người dùng thành công!", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi tạo người dùng" });
  }
});

// 🟦 Xoá người dùng (chỉ admin)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Xoá người dùng thành công" });
  } catch (err) {
    console.error("❌ Lỗi xoá user:", err);
    res.status(500).json({ message: "Lỗi server khi xoá người dùng" });
  }
});

module.exports = router;
