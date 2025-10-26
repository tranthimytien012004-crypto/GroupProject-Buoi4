// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Gắn routes thật (nếu đã có)
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// (Tuỳ chọn) Route tạm để test nhanh API
app.get('/api/test', (req, res) => {
  res.json({ message: '🚀 Server hoạt động bình thường!' });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
