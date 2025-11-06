import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const token = params.get("token"); // Lấy token từ URL

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
    "https://reimagined-spork-r46qwxqgvx5jhx5wj-5000.app.github.dev/api/auth/reset-password",
    { token, password }
    );
      setMsg(res.data.message);
      alert("Đổi mật khẩu thành công!");
      navigate("/login");
    } catch (err) {
      setMsg(err.response?.data?.message || "Lỗi khi đổi mật khẩu!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🔐 Đặt lại mật khẩu</h2>
      <form onSubmit={handleReset} style={{ display: "inline-block", marginTop: "20px" }}>
        <input
          type="password"
          placeholder="Nhập mật khẩu mới"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", width: "250px", borderRadius: "5px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Đổi mật khẩu
        </button>
      </form>
      {msg && <p style={{ marginTop: "20px", color: "green" }}>{msg}</p>}
    </div>
  );
}
