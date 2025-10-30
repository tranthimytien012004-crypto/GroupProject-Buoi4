const jwt = require('jsonwebtoken');

// Middleware kiểm tra token JWT
module.exports = function (req, res, next) {
  // Lấy token từ header Authorization
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // secret từ .env
    req.user = decoded.user; // lưu thông tin user từ token
    next(); // chuyển tiếp sang route
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};
