const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Xác minh token
exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "Không có token!" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔒 Lưu cả id và role vào req.user
    req.user = decoded;

    next();
  } catch (err) {
    console.error("❌ verifyToken error:", err.message);
    return res.status(403).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};

// ✅ Kiểm tra quyền admin
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Bạn không có quyền admin!" });
  }
  next();
};
