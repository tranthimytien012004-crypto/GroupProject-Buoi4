<<<<<<< HEAD
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
app.use('/api', userRoutes);



// Cổng chạy server
const PORT = process.env.PORT || 3000;

// Khởi động server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
=======
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mảng tạm lưu danh sách user
let users = [
  { id: 1, name: "Tím Phạm", email: "timpham@example.com" },
  { id: 2, name: "Sinh viên 2", email: "sv2@example.com" },
];

// GET /api/users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// POST /api/users
app.post("/api/users", (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
>>>>>>> frontend
});
