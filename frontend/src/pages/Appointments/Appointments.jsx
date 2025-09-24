import React from "react";
import { useSelector } from "react-redux";
import PatienAppointments from "./PatientAppointments/PatientAppointments";
import DoctorAppointments from "./DoctorAppointments/DoctorAppointments";

const Appointments = () => {
  const { userdata } = useSelector((state) => state.auth);
  return (
    <>
      {userdata?.user?.role === "patient" ? (
        <PatienAppointments />
      ) : (
        <DoctorAppointments />
      )}
    </>
  );
};

export default Appointments;
