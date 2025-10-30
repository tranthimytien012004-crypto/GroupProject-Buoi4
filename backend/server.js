// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Gọi các route
const authRoutes = require('./routes/auth'); // đăng ký / đăng nhập
const userRoutes = require('./routes/user'); // CRUD user (nếu có)

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Đã kết nối MongoDB'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// ✅ Định nghĩa route
//app.use('/api/auth', authRoutes); // /signup, /login
//app.use('/api/users', userRoutes); // /, /:id,...


// ✅ Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`));
