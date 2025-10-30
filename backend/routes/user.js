// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ✅ Các route CRUD người dùng
router.get("/", userController.getUsers);        // Lấy danh sách user
router.post("/", userController.addUser);        // Thêm user
router.put("/:id", userController.updateUser);   // Cập nhật user
router.delete("/:id", userController.deleteUser); // Xóa user

module.exports = router;
