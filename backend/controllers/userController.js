// controllers/userController.js

// Mảng tạm người dùng
let users = [
  { id: 1, name: "Trần Thị Mỹ Tiên", email: "tranthimytien@gmail.com" },
  { id: 2, name: "Phạm Thị Hoa Tím", email: "tim226289@student.nctu.edu.vn" }
];

// GET /users
exports.getUsers = (req, res) => {
  res.json(users);
};

// POST /users
exports.addUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
};
