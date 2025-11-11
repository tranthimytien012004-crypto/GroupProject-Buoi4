const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

const { signup, login, logout } = require("../controllers/authController");
const User = require("../models/User");
const { verifyToken } = require("../middleware/auth");

router.use(fileUpload({ useTempFiles: true }));

// ==================== Đăng ký / Đăng nhập / Đăng xuất ====================
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// ==================== Quên mật khẩu ====================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Email không tồn tại!" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
    await user.save();

    res.json({
      message: "✅ Token reset được tạo thành công!",
      resetToken,
      link_demo: `https://your-app/reset-password?token=${resetToken}`,
    });
  } catch (err) {
    console.error("❌ Lỗi forgot-password:", err);
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// ==================== Đặt lại mật khẩu ====================
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Token không hợp lệ hoặc hết hạn!" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "✅ Đặt lại mật khẩu thành công!" });
  } catch (err) {
    console.error("❌ Lỗi reset-password:", err);
    res.status(500).json({ message: "Lỗi server khi đặt lại mật khẩu!" });
  }
});

// ==================== Upload Avatar ====================
router.post("/upload-avatar", verifyToken, async (req, res) => {
  try {
    if (!req.files || !req.files.avatar)
      return res.status(400).json({ message: "Vui lòng chọn ảnh!" });

    const file = req.files.avatar;
    const upload = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "avatars",
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: upload.secure_url },
      { new: true }
    );

    res.json({ message: "✅ Upload avatar thành công!", avatar: user.avatar });
  } catch (err) {
    console.error("❌ Lỗi upload-avatar:", err);
    res.status(500).json({ message: "Lỗi khi upload ảnh!" });
  }
});

module.exports = router;
