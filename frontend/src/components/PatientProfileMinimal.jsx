import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../utilus/axiosInstance";

const PatientProfileMinimal = () => {
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;
  const [loading, setLoading] = useState(true);

  const [profileExists, setProfileExists] = useState(true);

  const fetchProfile = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.get(`/patient/getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfileExists(true);
    } catch (err) {
      if (err?.response?.status === 404) {
        setProfileExists(false);
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
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!profileExists) {
    return (
      <div className="text-center p-4">
        <Link
          to={"/profile"}
          className="
                        px-6 py-1 text-white bg-green-600 rounded-md font-semibold 
                        hover:bg-green-700 transition duration-150
                    "
        >
          Create My Profile
        </Link>
        <p className="mt-2 text-sm text-gray-500">
          Profile not found. Please create to perform All operations.
        </p>
      </div>
    );
  }
};

export default PatientProfileMinimal;
