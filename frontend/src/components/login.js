import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, password }
      );

      console.log("📦 Dữ liệu trả về từ login API:", res.data);

      // ✅ Lưu cả accessToken + refreshToken + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message || "Đăng nhập thành công!");

      // ✅ Điều hướng về trang profile
      window.location.href = "/";
    } catch (err) {
      console.error("❌ Lỗi đăng nhập:", err);
      alert(err.response?.data?.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Đăng nhập</h2>

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
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p style={{ marginTop: 10 }}>
          Chưa có tài khoản?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Đăng ký ngay
          </span>
        </p>

        <p style={{ marginTop: 10 }}>
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/forgot-password")}
          >
            Quên mật khẩu?
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
