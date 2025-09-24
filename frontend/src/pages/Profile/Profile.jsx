import React from "react";
import { useSelector } from "react-redux";
import DoctorProfile from "./DoctorProfile/DoctorProfile";
import PatientProfile from "./PatientProfile/PatientProfile";

const Profile = () => {
  const { userdata } = useSelector((state) => state.auth);
  return (
    <>
      {userdata?.user?.role === "patient" ? (
        <PatientProfile />
      ) : (
        <DoctorProfile />
      )}
    </>
  );
};

export default Profile;
