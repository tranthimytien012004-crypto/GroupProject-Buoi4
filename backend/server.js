// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load biến môi trường từ file .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Đã kết nối MongoDB thành công'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err.message));

// ✅ Import các route
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');


// ✅ Sử dụng route
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// ✅ Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`)
);
