import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  FaPhone,
  FaEnvelope,
  FaBirthdayCake,
  FaUser,
  FaTint,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";
import axiosInstance from "../../../utilus/axiosInstance";
import LoadingBar from "../../../components/LoadingBar";
import NoProfileUI from "./components/NoPrNoProfileUIofile";
import { Link, useNavigate } from "react-router-dom";
import FormatDate from "../../../components/FormateDate";

const PatientProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [profileNotFound, setProfileNotFound] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const operationType = "update"

  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;

  const fetchPatientProfile = useCallback(async () => {
    if (!token) {
      setError("Authentication required.");
      navigate("/login");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get(`/patient/getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      setProfileData(data.patientProfile);
      setMedicalHistory(data.AllMedicalHistory || []);
      setError(null);
    } catch (err) {
      if (err?.response?.status === 404) {
        setProfileNotFound(true);
        setProfileData(null);
        setMedicalHistory([]);
      } else {
        setError("Failed to load profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPatientProfile();
  }, [fetchPatientProfile]);

  if (loading) {
    return <LoadingBar />;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  if (profileNotFound) {
    return <NoProfileUI />;
  }

  const mobileNumber =
    profileData.mobileNo || profileData.userId?.mobileNo || "N/A";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl my-10">
      <div className="flex justify-between items-center pb-6 border-b border-gray-100 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            <img src={profileData.profilePic} alt="pic"  />
          </div>
          <h1 className="text-3xl font-semibold text-gray-800">
            {profileData.name || "N/A"}
          </h1>
        </div>
        <Link to={"/profile/edit"} state={operationType}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-150"
        >
          <RiEditBoxFill className="w-4 h-4" />
          <span>Edit Profile</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 mb-10">

        <div className="flex items-center space-x-3">
          <FaPhone className="text-blue-500 w-5 h-5" />
          <div>
            <p className="text-xs text-gray-500">Mobile Number</p>
            <p className="font-medium">{mobileNumber}</p>
          </div>
        </div>
        {/* Email Address */}
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-blue-500 w-5 h-5" />
          <div>
            <p className="text-xs text-gray-500">Email Address</p>
            <p className="font-medium">{profileData.email || "N/A"}</p>
          </div>
        </div>
        {/* Date of Birth */}
        <div className="flex items-center space-x-3">
          <FaBirthdayCake className="text-blue-500 w-5 h-5" />
          <div>
            <p className="text-xs text-gray-500">Date of Birth</p>
            <p className="font-medium">{FormatDate(profileData.dateOfBirth)}</p>
          </div>
        </div>
        {/* Gender */}
        <div className="flex items-center space-x-3">
          <FaUser className="text-blue-500 w-5 h-5" />
          <div>
            <p className="text-xs text-gray-500">Gender</p>
            <p className="font-medium">{profileData.gender || "N/A"}</p>
          </div>
        </div>
        {/* Blood Group */}
        <div className="flex items-center space-x-3">
          <FaTint className="text-red-500 w-5 h-5" />
          <div>
            <p className="text-xs text-gray-500">Blood Group</p>
            <p className="font-medium">{profileData.bloodGroup || "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <IoLocationOutline className="text-red-500 w-5 h-5" />
          <div>
            <p className="text-xs text-gray-500">address</p>
            <p className="font-medium">{profileData?.address || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Recent Medical History */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Recent Medical History
      </h2>

      {medicalHistory.length > 0 ? (
        medicalHistory.slice(0, 2).map(
          (
            history,
            index 
          ) => (
            <div
              key={history._id}
              className="p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50"
            >
              <p className="text-lg font-medium text-gray-800">
                {history.condition}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Diagnosed on: {FormatDate(history.diagnosisDate)}
              </p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                Treatment: {history.treatment}
              </p>
            </div>
          )
        )
      ) : (
        <div className="text-center py-4 text-gray-500 border border-dashed rounded-lg">
          No recent medical history found.
        </div>
      )}

      {/* View More Button */}
      <div className="text-center mt-6">
        <Link to={"/patient/medical-history"}
          className="px-8 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          View More History
        </Link>
      </div>
    </div>
  );
};

export default PatientProfile;
