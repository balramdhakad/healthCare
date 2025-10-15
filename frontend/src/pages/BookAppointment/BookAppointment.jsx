import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../utilus/axiosInstance";
import { useSelector } from "react-redux";
import PatientCheck from "../../components/Profilecheck";

const BookAppointment = () => {
  const { id: doctorId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [appointmentType, setAppointmentType] = useState("physical");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [profileExists, setProfileExists] = useState(null);

  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;

  const handleProfileCheck = (exists) => {
    setProfileExists(exists);
  };

  useEffect(() => {
    if (!date || !profileExists) return;

    const fetchSlots = async () => {
      try {
        const res = await axiosInstance.get(`/general/${doctorId}/availability`, {
          params: { date },
        });
        if (res.data.success) {
          setAvailableTimes(res.data.slots);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch availability");
      }
    };

    fetchSlots();
  }, [doctorId, date, profileExists]);

  const handleBook = async () => {
    if (!profileExists) {
      toast.error("Please update your profile to book an appointment.");
      return;
    }

    if (!date || !time || !reasonForVisit) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/appointment/book",
        { doctorId, date, time, reasonForVisit, appointmentType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setConfirmation(res.data.data);
        toast.success("Appointment booked successfully!");
        navigate("/appointments");
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto border-2 border-blue-400 p-6 bg-blue-50 shadow-lg rounded-xl mt-6">

      <PatientCheck token={token} onProfileCheck={handleProfileCheck} />

      {profileExists === false ? (
        <div className="text-center p-6">
          <p className="text-gray-600 mb-3">
            Please complete your profile to book appointments.
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
          >
            Update Profile
          </button>
        </div>
      ) : profileExists === true ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Book Appointment
          </h2>

          <label className="block mb-2 font-medium">Select Date</label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          />

          <label className="block mb-2 font-medium">Select Preferred Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="">-- Select Time --</option>
            {availableTimes.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-medium">Reason for Visit</label>
          <textarea
            value={reasonForVisit}
            onChange={(e) => setReasonForVisit(e.target.value)}
            className="w-full border p-2 rounded mb-4"
            placeholder="Describe your issue..."
          />

          <label className="block mb-2 font-medium">Appointment Type</label>
          <select
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
            className="w-full border p-2 rounded mb-4"
          >
            <option value="physical">Physical Visit</option>
            <option value="video">Video Consultation</option>
          </select>

          <button
            onClick={handleBook}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>

          {confirmation && (
            <div className="mt-6 p-4 border rounded bg-green-50">
              <h3 className="text-lg font-semibold mb-2 text-green-700">
                Appointment Confirmed
              </h3>
              <p>
                <strong>Token No:</strong> {confirmation.tokenNo}
              </p>
              <p>
                <strong>Estimated Time:</strong>{" "}
                {confirmation.estimatedTime
                  ? new Date(confirmation.estimatedTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Pending"}
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 mt-4">Checking profile...</p>
      )}
    </div>
  );
};

export default BookAppointment;
