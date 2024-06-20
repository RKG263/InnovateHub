
import React from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({  children, user,redirect= "/login" , message = undefined }) => {
  if (!user) {
     if(message) return toast.success(message) ;
    //  toast.error("Please Sign In to access this Page")
     return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;