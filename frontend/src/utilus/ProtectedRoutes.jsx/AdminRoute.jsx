import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AdminRoute = ({ element: Component }) => {
  const { userdata } = useSelector((state) => state.auth);
  const isAdmin = userdata?.user?.role === "admin";

  if (!userdata || !isAdmin) {
    toast.error("Access Denied")
    return <Navigate to="/" replace />;
  }

  return Component;
};

export default AdminRoute;
