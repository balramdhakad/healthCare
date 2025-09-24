import React from "react";
import { useSelector } from "react-redux";
import PatienDashboard from "./PatientDashboard/PatienDashboard";
import DoctorDashboard from "./DoctorDashboard/DoctorDashboard";

const Dashboard = () => {
  const { userdata } = useSelector((state) => state.auth);
  return (
    <>
      {userdata?.user?.role === "patient" ? (
        <PatienDashboard />
      ) : (
        <DoctorDashboard />
      )}
    </>
  );
};

export default Dashboard;
