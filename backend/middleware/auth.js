// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Lấy token từ header Authorization
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
  }

  try {
    // Xác thực token bằng secret trong .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lưu thông tin user đã decode vào request để các route khác dùng
    req.user = decoded;

    next(); // Cho phép đi tiếp tới route tiếp theo
  } catch (err) {
    console.error('❌ Lỗi xác thực token:', err.message);
    return res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};
