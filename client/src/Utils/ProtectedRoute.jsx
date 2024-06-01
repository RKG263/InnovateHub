
import React from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({  children, user,redirect= "/login" , message = undefined }) => {
  if (!user) {
     if(message) toast.success(message) ;
     return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;