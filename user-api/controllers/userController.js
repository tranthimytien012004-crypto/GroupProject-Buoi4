// Mảng tạm lưu danh sách user
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

// GET /users - trả về danh sách người dùng
const getUsers = (req, res) => {
  res.json(users);
};

// POST /users - thêm người dùng mới
const addUser = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = { getUsers, addUser };