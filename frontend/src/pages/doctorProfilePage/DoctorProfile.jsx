import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utilus/axiosInstance";
import LoadingBar from "../../components/LoadingBar";
import DoctorHeader from "./components/DoctorHeader";
import DoctorMainContent from "./components/DoctorMainContent";
import DoctorInfoSidebar from "./components/DoctorInfoSidebar";

const DoctorProfilePage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get(`/general/getdoctor/${id}`);
        const data = response.data.data;
        setDoctor(data);
      } catch (err) {
        console.error("Error fetching doctor profile:", err);
        setError("Failed to load doctor profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return <LoadingBar />;
  }

  if (!doctor || error) {
    return (
      <div className="text-center text-red-500 py-12">
        {error || "Doctor not found."}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            <DoctorHeader doctor={doctor} />
            <DoctorMainContent doctor={doctor} />
          </div>
          <DoctorInfoSidebar doctor={doctor} />
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
