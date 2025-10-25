const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

console.log("MONGO_URI =", process.env.MONGO_URI);

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

mongoose.connect(process.env.MONGO_URI)



app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
