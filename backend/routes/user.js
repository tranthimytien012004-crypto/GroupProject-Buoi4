// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ✅ Các route CRUD người dùng

// Lấy danh sách tất cả user
router.get("/users", userController.getUsers);

// Thêm user mới
router.post("/users", userController.addUser);

// Cập nhật user theo ID
router.put("/users/:id", userController.updateUser);

// Xóa user theo ID
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
