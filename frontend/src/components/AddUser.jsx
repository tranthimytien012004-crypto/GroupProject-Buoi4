import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onUserAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ Validation dữ liệu
    if (!name.trim()) {
      alert("⚠️ Tên không được để trống!");
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      alert("⚠️ Email không hợp lệ!");
      return;
    }
    try {
      await axios.post("https://reimagined-spork-r46qwxqgvx5jhx5wj-5000.app.github.dev/api/users", { name, email });
      alert("✅ Thêm người dùng thành công!");
      setName("");
      setEmail("");
      onUserAdded(); // Cập nhật lại danh sách
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
      alert("Thêm thất bại, vui lòng thử lại!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-lg font-bold mb-2">
      <h2 className="text-lg font-bold mb-2">Thêm người dùng</h2>
      <input
        type="text"
        placeholder="Tên người dùng"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Địa chỉ Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        ➕ Thêm người dùng
      </button>
    </form>
  );
};

export default AddUser;
