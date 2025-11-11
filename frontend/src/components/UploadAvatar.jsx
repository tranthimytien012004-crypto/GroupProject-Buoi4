import { useState } from "react";
import axios from "axios";

export default function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!file) return setError("⚠️ Vui lòng chọn một ảnh trước khi tải lên!");

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || "https://reimagined-spork-r46qwxqgvx5jhx5wj-5000.app.github.dev"}/api/auth/upload-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMsg(res.data.message || "✅ Upload avatar thành công!");
      setPreview(res.data.avatar);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Tải ảnh thất bại!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#007bff", marginBottom: "15px" }}>🖼️ Upload Avatar</h2>

      {msg && (
        <div
          style={{
            background: "#d4edda",
            color: "#155724",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            fontWeight: "500",
          }}
        >
          {msg}
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            fontWeight: "500",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleUpload}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="fileInput"
            style={{
              display: "inline-block",
              background: "#007bff",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.3s",
            }}
          >
            📂 Chọn ảnh
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #007bff",
              marginBottom: "20px",
              boxShadow: "0 0 10px rgba(0,0,0,0.15)",
            }}
          />
        )}

        <p style={{ fontSize: "0.9rem", color: "gray" }}>
          (Tối đa 10MB • JPG, PNG, GIF, WEBP)
        </p>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
            transition: "0.3s",
          }}
        >
          🚀 Tải lên
        </button>
      </form>
    </div>
  );
}
