// controllers/userController.js

// Mảng tạm người dùng (dùng khi chưa kết nối MongoDB)
let users = [
  { id: 1, name: "Trần Thị Mỹ Tiên", email: "tranthimytien@gmail.com" },
  { id: 2, name: "Phạm Thị Hoa Tím", email: "tim226289@student.nctu.edu.vn" }
];

// ================== GET /users ==================
exports.getUsers = (req, res) => {
  res.json(users);
};

// ================== POST /users ==================
exports.addUser = (req, res) => {
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

// ================== PUT /users/:id ==================
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id == id);

  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// ================== DELETE /users/:id ==================
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id == id);

  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
