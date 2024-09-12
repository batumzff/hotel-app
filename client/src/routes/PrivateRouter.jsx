import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, NavLink, Outlet } from 'react-router-dom'

// const PrivateRouter = ({allowedRoles=[]}) => {
//   const { user } = useSelector(state => state.auth)
//   // const user = true
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   const userRoles = [];
//   if (user.isAdmin) userRoles.push("admin");
//   if (user.isStaff) userRoles.push("staff");
//   // if (user.isActive) userRoles.push("user");

//   if (!user || !user.isActive) {
//     return <Navigate to="/login" replace />;
//   }

//   const hasRequiredRole = allowedRoles.some(role => userRoles.includes(role));

//   if (allowedRoles.length > 0 && !hasRequiredRole) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// }

const PrivateRouter = ({ allowedRoles = [] }) => {
  const { user,token } = useSelector(state => state.auth);
  console.log(user);
console.log(token);
console.log(allowedRoles);
  
  if (!user || !user.isActive ) {
    return <Navigate to="/login" replace />;
  }

  
  const userRoles = [];

  if (user.isActive) userRoles.push("user");
  if (user.isAdmin) userRoles.push("admin");
  if (user.isStaff) userRoles.push("staff");


  
  const hasRequiredRole = allowedRoles.some(role => userRoles.includes(role));
console.log(hasRequiredRole);
  
  if (allowedRoles.length > 0 && !hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  
  return <Outlet />;
};

export default PrivateRouter