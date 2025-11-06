import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
        { email }
      );
      setMsg(res.data.link_demo
       ? `${res.data.message}\nLink: ${res.data.link_demo}`
      : res.data.message
);
    } catch (err) {
      setError(err.response?.data?.message || "Gửi email thất bại!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>🔑 Quên mật khẩu</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", marginTop: 20 }}>
        <input
          type="email"
          value={email}
          placeholder="Nhập email..."
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px", marginRight: "10px", width: "250px" }}
        />
        <button type="submit" style={{ padding: "8px 15px" }}>
          Gửi token
        </button>
      </form>
      {msg && <p style={{ color: "green", marginTop: 15, whiteSpace: "pre-line"}}>{msg}</p>}
      {error && <p style={{ color: "red", marginTop: 15 }}>{error}</p>}
    </div>
  );
}
