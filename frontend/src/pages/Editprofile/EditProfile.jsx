import React from "react";
import { useSelector } from "react-redux";
import EditDoctorProfile from "./EditDoctorProfile/EditDoctorProfile";
import EditPatientProfile from "./EditPatientProfile/EditPatientProfile";


const EditProfile = () => {
  const { userdata } = useSelector((state) => state.auth);
  return (
    <>
      {userdata?.user?.role === "patient" ? (
        <EditPatientProfile />
      ) : (
        <EditDoctorProfile />
      )}
    </>
  );
};

export default EditProfile;
