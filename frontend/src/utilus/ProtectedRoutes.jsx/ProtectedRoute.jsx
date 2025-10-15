import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProtectedRoute = ({ element: Component }) => {
  const { userdata } = useSelector((state) => state.auth);


  if (!userdata) {
    toast.error(`Login To Continue`)
    return <Navigate to="/login" replace />;
  }

  return Component;
};

export default ProtectedRoute;
