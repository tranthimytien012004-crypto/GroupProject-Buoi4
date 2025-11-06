import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ thêm dòng này
import "./AuthForm.css";

const Signup = () => {
  const navigate = useNavigate(); // ✅ thêm dòng này
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        { name: username, email, password }
      );

      alert(res.data.message || "✅ Đăng ký thành công!");
      navigate("/login"); // ✅ chuyển sang trang đăng nhập sau khi đăng ký
    } catch (err) {
      alert(err.response?.data?.message || "⚠️ Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Đăng ký tài khoản</h2>
        <input
          type="text"
          placeholder="Họ và tên"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        {/* 👇 Link quay lại đăng nhập */}
        <p style={{ marginTop: 10 }}>
          Đã có tài khoản?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup; // ✅ quan trọng
