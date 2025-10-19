// server.js
const express = require('express');
const app = express();
require('dotenv').config();

// Middleware để xử lý JSON
app.use(express.json());

//Gán route user 
const userRoutes = require('./routes/user');
app.use('/', userRoutes);

// Cổng chạy server
const PORT = process.env.PORT || 3000;

// Khởi động server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
