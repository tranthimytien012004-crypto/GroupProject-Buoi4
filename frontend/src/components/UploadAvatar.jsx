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

    if (!file) return setError("Vui lòng chọn một ảnh trước khi tải lên!");

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/upload-avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMsg(res.data.message || "Tải ảnh thành công!");
      setPreview(res.data.avatar); // Cập nhật ảnh mới
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Tải ảnh thất bại!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>🖼️ Upload Avatar</h2>

      <form onSubmit={handleUpload} style={{ display: "inline-block", marginTop: 20 }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: 10 }}
        />
        <br />
        {preview && (
          <img
            src={preview}
            alt="Avatar Preview"
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              objectFit: "cover",
              marginTop: 10,
              border: "2px solid #007bff",
            }}
          />
        )}
        <br />
        <button
          type="submit"
          style={{
            padding: "8px 15px",
            marginTop: 20,
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Tải lên
        </button>
      </form>

      {msg && <p style={{ color: "green", marginTop: 15 }}>{msg}</p>}
      {error && <p style={{ color: "red", marginTop: 15 }}>{error}</p>}
    </div>
  );
}
