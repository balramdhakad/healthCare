import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingBar from "../../../components/LoadingBar";
import axiosInstance from "../../../utilus/axiosInstance";
import ProfileCardUI from "./components/ProfileCardUI";
import NoProfileUI from "./components/NoProfile";


const DoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileNotFound, setProfileNotFound] = useState(false);

  const { userdata } = useSelector((state) => state.auth);

  useEffect(() => {
    const getDoctorProfile = async () => {
      setLoading(true);
      setProfileNotFound(false);
      
      if (!userdata?.token) {
        setLoading(false);
        window.alert("Login First.");
        return;
      }

      try {
        const response = await axiosInstance.get("/doctor/profile", {
          headers: {
            Authorization: `Bearer ${userdata?.token}`,
          },
        });
        setProfile(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setProfileNotFound(true);
          setProfile(null);
        } else {
          console.log(error);
          window.alert("server error");
          setProfile(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getDoctorProfile();
  }, [userdata?.token]);

  if (loading) {
    return <LoadingBar />;
  }

  if (profileNotFound) {
    return <NoProfileUI />;
  }

  if (profile) {
    return <ProfileCardUI profile={profile} />;
  }

  return (
    <div className="text-center p-20 text-lg text-red-500">
      <p>An unexpected server error occurred. Please try refreshing.</p>
    </div>
  );
};

export default DoctorProfile;
