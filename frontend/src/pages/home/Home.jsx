import React from "react";
import { useSelector } from "react-redux";
import PatientHome from "./patientHome/PatientHomepage";
import DoctorHome from "./doctorHome/DoctorHome";

const Home = () => {
    const { userdata } = useSelector((state) => state.auth);
  console.log(userdata)

  return (
    <>{userdata?.user?.role === "doctor" ?  <DoctorHome /> : <PatientHome />}</>
  );
};

export default Home;
