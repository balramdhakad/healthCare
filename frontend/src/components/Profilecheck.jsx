import React, { useState, useEffect } from "react";
import axiosInstance from "../utilus/axiosInstance";

const PatientCheck = ({ token, onProfileCheck }) => {
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!token) {
      setLoading(false);
      onProfileCheck(false);
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.get(`/patient/getProfile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onProfileCheck(true);
    } catch (err) {
      if (err?.response?.status === 404) {
        onProfileCheck(false);
      } else {
        console.error("API error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-10">
        <p className="text-lg text-gray-500">Checking profile...</p>
      </div>
    );
  }

  return null;
};

export default PatientCheck;
