//cập nhật
//server.js
const express = require('express');
const mongoose = require('mongoose');   // Thêm mongoose
const app = express();
require('dotenv').config();

// Middleware để xử lý JSON
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Gán route user 
const userRoutes = require('./routes/user');
app.use('/', userRoutes);

// Cổng chạy server
const PORT = process.env.PORT || 3000;

// Khởi động server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
const mongoose = require("mongoose");
