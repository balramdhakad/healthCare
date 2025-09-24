import { useSelector } from "react-redux";
import PatientHome from "./patientHome/PatientHomepage";
import DoctorHome from "./doctorHome/DoctorHome";
import LoadingBar from "../../components/LoadingBar";

const Home = () => {
    const { userdata } = useSelector((state) => state.auth);

  return (
    <>{userdata?.user?.role === "doctor" ?  <DoctorHome /> : <PatientHome />}</>
  );
};

export default Home;
