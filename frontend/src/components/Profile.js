import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const navigate = useNavigate();

  // 🌐 Đặt URL API: tự nhận môi trường Codespace hoặc localhost
  const BASE_URL =
    process.env.REACT_APP_API_URL ||
    "https://reimagined-spork-r46qwxqgvx5jhx5wj-5000.app.github.dev"; // 🟢 thay link backend Codespace của bạn

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${BASE_URL}/api/profile`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Cập nhật thành công!");
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi cập nhật thông tin!");
    }
  };

  if (!user) return <h2>Không tìm thấy thông tin người dùng</h2>;

  return (
    <div>
      {/* 🟦 Thanh Navbar */}
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "1rem",
          background: "#007bff",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Trang chủ
        </Link>
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          Profile
        </Link>
        {user.role?.toLowerCase() === "admin" && (
          <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
            Quản lý User
          </Link>
        )}
        <button
          onClick={handleLogout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            marginLeft: "auto",
          }}
        >
          Đăng xuất
        </button>
      </nav>

      {/* 🧾 Thông tin người dùng */}
      <div style={{ padding: "2rem" }}>
        <h2>Thông tin cá nhân</h2>

        {!editing ? (
          <>
            <p><strong>Họ và tên:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Vai trò:</strong> {user.role}</p>
            <p><strong>SĐT:</strong> {user.phone || "Chưa có"}</p>
            <p><strong>Địa chỉ:</strong> {user.address || "Chưa có"}</p>
            <p><strong>Tạo lúc:</strong> 
              {user.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "Không xác định"}
            </p>

            <button
              onClick={() => setEditing(true)}
              style={{
                background: "orange",
                color: "white",
                border: "none",
                padding: "8px 15px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              ✏️ Chỉnh sửa thông tin
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: 300 }}>
              <label>Họ và tên:</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <label>Số điện thoại:</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <label>Địa chỉ:</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>

            <button
              onClick={handleSave}
              style={{
                background: "green",
                color: "white",
                border: "none",
                padding: "8px 15px",
                cursor: "pointer",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              💾 Lưu thay đổi
            </button>
            <button
              onClick={() => setEditing(false)}
              style={{
                background: "gray",
                color: "white",
                border: "none",
                padding: "8px 15px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              ❌ Hủy
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
