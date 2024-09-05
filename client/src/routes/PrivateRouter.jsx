import React from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Outlet } from "react-router-dom";

const PrivateRouter = ({ allowedRoles = [] }) => {
  const { user, token } = useSelector((state) => state.auth);
  console.log(user);
  console.log(token);
  console.log(allowedRoles);
  // If user is not logged in or not active, redirect to login
  if (!user || !user.isActive) {
    return <Navigate to="/login" replace />;
  }

  // Collect user roles based on flags from the backend
  const userRoles = [];

  if (user.isActive) userRoles.push("user");
  if (user.isAdmin) userRoles.push("admin");
  if (user.isStaff) userRoles.push("staff");

  // Check if the user has any of the required roles
  const hasRequiredRole = allowedRoles.some((role) => userRoles.includes(role));
  console.log(hasRequiredRole);
  // If roles are required but the user lacks them, redirect to unauthorized
  if (allowedRoles.length > 0 && !hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render the child routes
  return <Outlet />;
};

export default PrivateRouter;
