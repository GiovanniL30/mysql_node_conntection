import React from "react";
import { useUser } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login?message=Please log in first" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
