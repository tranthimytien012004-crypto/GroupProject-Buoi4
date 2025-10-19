// routes/user.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Định nghĩa các route
router.get("/users", userController.getUsers);
router.post("/users", userController.addUser);

module.exports = router;
