import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Component bảo vệ route riêng tư (Private Route)
 * @param {JSX.Element} children - component con (nội dung trang)
 * @param {string} allowedRole - quyền cần có ("admin" hoặc "user")
 */
const PrivateRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Nếu chưa đăng nhập
  if (!token || !user) {
    alert("⚠️ Bạn cần đăng nhập trước!");
    return <Navigate to="/login" replace />;
  }

  // 🔒 Nếu route yêu cầu quyền admin mà user không phải admin
  if (
    allowedRole === "admin" &&
    user.role?.toLowerCase() !== "admin"
  ) {
    alert("⛔ Bạn không có quyền truy cập trang này!");
    return <Navigate to="/" replace />;
  }

  // ✅ Nếu hợp lệ → cho phép truy cập
  return children;
};

export default PrivateRoute;
