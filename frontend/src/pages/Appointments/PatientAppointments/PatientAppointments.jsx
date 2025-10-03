import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utilus/axiosInstance";
import LoadingBar from "../../../components/LoadingBar";
import RatingModal from "./components/RatingModel";
import AppointmentsTable from "./components/AppointmentsTable";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;

  const handleRatingOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };
  const handleRatingClose = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };
  const handleRatingSubmitted = (appointmentId, newRatingData) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app._id === appointmentId ? { ...app, rating: newRatingData } : app
      )
    );
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
        setAppointments(res.data.data);
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


  useEffect(() => {
    let filtered = [...appointments];

    if (activeTab === "upcoming") filtered = filtered.filter((appt) => appt.status === "scheduled");
    else if (activeTab === "completed") filtered = filtered.filter((appt) => appt.status === "completed");
    else if (activeTab === "cancelled") filtered = filtered.filter((appt) => appt.status === "canceled");

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (appt) =>
          appt.doctorId.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          appt.reasonForVisit?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  }, [activeTab, searchQuery, appointments]);

  if (loading) return <LoadingBar />;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {["upcoming", "all", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeTab === tab
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by doctor name or reason..."
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Appointments Table */}
        <AppointmentsTable
          appointments={filteredAppointments}
          onRatingOpen={handleRatingOpen}
        />

        {/* Rating Modal */}
        {isModalOpen && selectedAppointment && (
          <RatingModal
            appointment={selectedAppointment}
            onClose={handleRatingClose}
            onRatingSubmitted={handleRatingSubmitted}
          />
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;
