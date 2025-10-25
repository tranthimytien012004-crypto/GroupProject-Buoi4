import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  
  // Lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://reimagined-spork-r46qwxqgvx5jhx5wj-5000.app.github.dev/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xóa người dùng
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reimagined-spork-r46qwxqgvx5jhx5wj-5000.app.github.dev/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      alert("Xóa thành công!");
    } catch (error) {
      console.error(error);
      alert("Xóa thất bại!");
    }
  };

  // Chọn người dùng để sửa
  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({ name: user.name, email: user.email });
  };

  // Cập nhật người dùng
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://reimagined-spork-r46qwxqgvx5jhx5wj-5000.app.github.dev/api/users/${editingUser._id}`,
        form
      );
      setUsers(users.map((user) => (user._id === editingUser._id ? res.data : user)));
      setEditingUser(null);
      setForm({ name: "", email: "" });
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error(error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="p-4">
      <h2>Danh sách người dùng</h2>

      <ul>
        {users.map((user) => (
          <li key={user._id} className="mb-2">
            {user.name} - {user.email} &nbsp;
            <button onClick={() => handleEdit(user)} className="mr-2">Sửa</button>
            <button onClick={() => handleDelete(user._id)}>Xóa</button>
          </li>
        ))}
      </ul>

      {editingUser && (
        <div className="mt-4">
          <h3>Chỉnh sửa người dùng</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Tên"
              className="mr-2"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="mr-2"
            />
            <button type="submit">Cập nhật</button>
            <button type="button" onClick={() => setEditingUser(null)} className="ml-2">
              Hủy
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserList;
