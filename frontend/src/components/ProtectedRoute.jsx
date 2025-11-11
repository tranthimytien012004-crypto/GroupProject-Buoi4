import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const auth = useSelector(state => state.auth);
  if (!auth.accessToken || !auth.user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && auth.user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}
