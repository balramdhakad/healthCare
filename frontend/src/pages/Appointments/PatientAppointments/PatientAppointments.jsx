import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utilus/axiosInstance";
import LoadingBar from "../../../components/LoadingBar";
import { Link, useNavigate } from "react-router-dom";
import FormatDate from "../../../components/FormateDate";
import AppointmentCard from "./components/AppointmentCard";
import RatingModal from "./components/RatingModel";

const PatientAppointments = () => {
  const navigate = useNavigate();
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [error, setError] = useState(null);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const handleRatingOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleRatingClose = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const handleRatingSubmitted = (appointmentId, newRatingData) => {
    setAllAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app._id === appointmentId ? { ...app, rating: newRatingData } : app
      )
    );
  };

  const groupAppointmentsByDate = (appointments) => {
    return appointments.reduce((groups, appointment) => {
      const dateKey = new Date(appointment.date).toISOString().split("T")[0];

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(appointment);
      return groups;
    }, {});
  };

  const fetchAppointments = useCallback(async () => {
    if (!token) {
      setError("User is not authenticated.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.get("/patient/appointment", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setAllAppointments(res.data.data);
      } else {
        setError(res.data.message || "Failed to load appointments.");
      }
    } catch (err) {
      setError("Server error while fetching appointments.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const now = new Date();
  const filteredAppointments = allAppointments.filter((app) => {
    const appointmentDateTime = new Date(app.date);
    if (activeTab === "upcoming") {
      return app.status === "scheduled" && appointmentDateTime >= now;
    }
    return true;
  });

  const groupedAppointments = groupAppointmentsByDate(filteredAppointments);
  const sortedDates = Object.keys(groupedAppointments).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  const handleViewDetails = (appointment) => {
    navigate(`/patient/appointments/${appointment._id}`);
  };

  if (loading) {
    return <LoadingBar />;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Appointments</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-4 py-2 text-lg font-semibold border-b-2 transition-colors ${
            activeTab === "upcoming"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:border-gray-300"
          }`}
        >
          Upcoming Appointments
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 text-lg font-semibold border-b-2 transition-colors ${
            activeTab === "all"
              ? "text-blue-600 border-blue-600"
              : "text-gray-500 border-transparent hover:border-gray-300"
          }`}
        >
          All Appointments
        </button>
      </div>

      {/* Appointment List */}
      {sortedDates.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-xl shadow">
          <p className="text-xl text-gray-500">
            No {activeTab} appointments found.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden divide-y divide-gray-100">
          {sortedDates.map((dateKey) => (
            <div key={dateKey} className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 p-4 bg-gray-100 sticky top-0 border-b">
                {FormatDate(dateKey)}
              </h2>
              <div>
                {groupedAppointments[dateKey].map((appointment) => (
                  <AppointmentCard
                    key={appointment._id}
                    appointment={appointment}
                    onViewDetails={handleViewDetails}
                    onRatingOpen={handleRatingOpen}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedAppointment && (
        <RatingModal
          appointment={selectedAppointment}
          onClose={handleRatingClose}
          onRatingSubmitted={handleRatingSubmitted}
        />
      )}
    </div>
  );
};

export default PatientAppointments;
