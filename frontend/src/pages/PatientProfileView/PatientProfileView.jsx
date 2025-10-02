import React, { useState, useEffect, useCallback } from "react";
import FormatDate from "../../components/FormateDate";
import {
  FaEnvelope,
  FaHeart,
  FaNotesMedical,
  FaPhone,
  FaTint,
} from "react-icons/fa";
import { CgCalendarDates, CgUser } from "react-icons/cg";
import axiosInstance from "../../utilus/axiosInstance";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingBar from "../../components/LoadingBar";
import { useSelector } from "react-redux";
import HistoryTimelineItem from "./components/HistoryTimelineItem";
import defaultImage from "../../assets/profile.png";

const PatientProfileView = () => {
  const [patientData, setPatientData] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;
  const { id } = useParams();

  const fetchPatientData = useCallback(async () => {
    if (!token || !id) {
      setError("Authentication or Patient ID missing.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get(`/general/getpatient/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPatientData(response.data.data.patientProfile);
      setMedicalHistory(response.data.data.AllMedicalHistory || []);
      setError(null);
    } catch (err) {
      toast.error("Failed to load patient data");
      setError("Failed to load patient data.");
    } finally {
      setIsLoading(false);
    }
  }, [token, id]);

  useEffect(() => {
    fetchPatientData();
  }, [fetchPatientData]);

  if (isLoading) return <LoadingBar />;
  if (error || !patientData) {
    return (
      <div className="p-10 text-center text-red-600">
        {error || "Patient record not found."}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 my-10">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Patient Health Overview: {patientData.name}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-4">
          <h2 className="text-xl font-bold text-teal-700 mb-4 border-b pb-2">
            Personal Details
          </h2>

          <div className="flex flex-col items-center mb-6">
            <img
              src={patientData.profilePic || defaultImage}
              alt={patientData?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <h3 className="text-2xl font-bold text-gray-900 mt-3">
              {patientData?.name}
            </h3>
            <p className="text-sm text-gray-500">{patientData?.email}</p>
          </div>

          <div className="space-y-3 text-gray-700">
            {[
              {
                icon: FaPhone,
                label: "Mobile",
                value: patientData?.mobileNo || "N/A",
              },
              {
                icon: CgCalendarDates,
                label: "DOB",
                value: FormatDate(patientData?.dateOfBirth),
              },
              {
                icon: CgUser,
                label: "Gender",
                value: patientData?.gender || "N/A",
              },
              {
                icon: FaTint,
                label: "Blood Group",
                value: patientData?.bloodGroup || "N/A",
              },
              {
                icon: FaEnvelope,
                label: "Address",
                value: patientData?.address || "Not Recorded",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 bg-gray-50 rounded-md"
              >
                <item.icon className="text-teal-600 w-5 h-5" />
                <div>
                  <p className="text-xs text-gray-500">{item?.label}</p>
                  <p className="font-medium text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-red-600 mb-4 border-b pb-2">
            Medical History Timeline
          </h2>

          <div className="relative">
            {medicalHistory.length > 0 ? (
              medicalHistory.map((record) => (
                <HistoryTimelineItem
                  key={record._id}
                  record={record}
                  onImageClick={(img) => setFullscreenImage(img)}
                />
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
                <p>No medical history records found for this patient.</p>
                <p className="text-sm mt-2">
                  Use the patient management tools to add a new record.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setFullscreenImage(null)}
        >
          <img
            src={fullscreenImage}
            alt="Medical Record"
            className="max-w-4xl max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default PatientProfileView;
