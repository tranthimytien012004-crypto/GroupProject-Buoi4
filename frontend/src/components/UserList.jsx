import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // 🟦 Hàm tải danh sách người dùng
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh sách user:", err);
      alert("Không thể tải danh sách người dùng!");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // 🟦 Hàm xoá người dùng
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá người dùng này không?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Xoá thành công!");
      fetchUsers(); // Cập nhật lại danh sách
    } catch (err) {
      console.error("❌ Lỗi khi xoá user:", err);
      alert("Không thể xoá người dùng!");
    }
  };

  // 🟦 Gọi API khi component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <p>Đang tải danh sách người dùng...</p>;

  return (
    <div className="user-list-container">
      <h2>📘 Quản lý người dùng</h2>
      <p>
        👋 Xin chào, <strong>Admin!</strong>
      </p>
      <p>Cập nhật lần cuối: {new Date().toLocaleString()}</p>

      <table className="user-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="role-admin">Admin</span>
                  ) : (
                    <span className="role-user">User</span>
                  )}
                </td>
                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Invalid Date"}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Không có người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
