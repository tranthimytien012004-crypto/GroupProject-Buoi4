const express = require('express');
const app = express();
const userRoutes = require('./routes/user');

// Middleware để xử lý JSON
app.use(express.json());

// Sử dụng route
app.use('/', userRoutes);

// Chạy server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
