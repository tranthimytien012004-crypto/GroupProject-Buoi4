import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🧩 Validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      alert("⚠️ Email không hợp lệ!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // 🧠 Gọi API
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        { name, email, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "✅ Thêm người dùng thành công!");
      setName("");
      setEmail("");
      setPassword("");
      setRole("User");
      onUserAdded?.(); // cập nhật danh sách
    } catch (error) {
      console.error("❌ Lỗi khi thêm người dùng:", error);
      alert(
        error.response?.data?.message ||
          "Thêm thất bại! Có thể bạn không có quyền (Admin)."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          ➕ Thêm người dùng mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Nhập tên người dùng"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Mật khẩu (ít nhất 6 ký tự)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Vai trò</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
          >
            {loading ? "⏳ Đang thêm..." : "Thêm người dùng"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
