import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="flex justify-between items-center px-8 py-3">
        <Link to="/" className="text-lg font-bold flex items-center gap-2">
          🏠 Hệ Thống Quản Lý
        </Link>

        <div className="flex items-center space-x-3">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg"
          >
            Trang chủ
          </Link>
          <Link
            to="/profile"
            className="bg-white text-blue-700 font-semibold px-3 py-1 rounded-lg"
          >
            Profile
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/users"
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg"
            >
              Quản lý User
            </Link>
          )}
          <div className="bg-blue-700 px-3 py-1 rounded-lg flex items-center gap-2">
            {user?.name || "Khách"}{" "}
            <span className="text-xs bg-blue-600 px-2 py-0.5 rounded-full">
              {user?.role || "user"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-blue-800 px-3 py-1 rounded-lg font-semibold"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
