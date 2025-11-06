import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./components/login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import UserList from "./components/UserList";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UploadAvatar from "./components/UploadAvatar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      <div>
        {token && (
          <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#007bff" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>Trang chủ</Link>
            <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link>
            <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>Quản lý User</Link>
            <Link to="/upload-avatar" style={{ color: "white", textDecoration: "none" }}>Upload Avatar</Link>
            <button onClick={handleLogout} style={{ marginLeft: "auto", background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
              Đăng xuất
            </button>
          </nav>
        )}

        <Routes>
          {!token && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}

          {token && (
            <>
              <Route
                path="/"
                element={
                  <PrivateRoute allowedRole="user">
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute allowedRole="user">
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/upload-avatar"
                element={
                  <PrivateRoute allowedRole="user">
                    <UploadAvatar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute allowedRole="admin">
                    <UserList />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
