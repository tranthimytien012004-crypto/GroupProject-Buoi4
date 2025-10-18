import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://reimagined-spork-r46qwxqgvx5jhx5wj-5000.app.github.dev/api/users", { name, email });
      alert("Thêm người dùng thành công!");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
      alert("Thêm thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2>Thêm người dùng</h2>
      <input
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Thêm</button>
    </form>
  );
};

export default AddUser;
