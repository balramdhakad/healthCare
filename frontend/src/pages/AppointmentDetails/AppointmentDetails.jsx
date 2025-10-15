
import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utilus/axiosInstance";
import LoadingBar from "../../components/LoadingBar";
import RatingModal from "../Appointments/PatientAppointments/components/RatingModel";
import AppointmentStatusBadge from "./components/AppointmentStatusBadge";
import AppointmentSchedule from "./components/AppointmentSchedule";
import ConsultationDetails from "./components/ConsultationDetails";
import DoctorCard from "./components/DoctorCard";
import AppointmentActions from "./components/AppointmentActions";
import RatingDisplay from "./components/RatingDisplay";
import CancelAppointment from "./components/CancelAppointment";
import PatientCard from "./components/PatientCard";

const AppointmentDetails = () => {
  const { id } = useParams();
  const { userdata } = useSelector((state) => state.auth);

  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancelReasonInput, setCancelReasonInput] = useState(false);

  const token = userdata?.token;

  const fetchDetails = useCallback(async () => {
    if (!token || !id) {
      setIsError("Invalid session or missing appointment ID.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get(`/appointment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.data)
      setAppointment(response.data.data);
    } catch (error) {
      setIsError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleRatingOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCancelOpenAndClose = () => {
    setCancelReasonInput(!cancelReasonInput);
  };

  const handleRatingClose = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const handleRatingSubmitted = (id, newRating) => {
    setAppointment((prev) =>
      prev && prev._id === id ? { ...prev, rating: newRating } : prev
    );
  };

  const handleCancelSubmitted = (id, cancelReason) => {
    setAppointment((prev) =>
      prev && prev._id === id
        ? { ...prev, status: "canceled", cancelReason }
        : prev
    );
  };

  if (isLoading) return <LoadingBar />;
  if (!appointment || isError)
    return (
      <div className="text-center p-10 text-red-500">
        {isError || "Appointment not found."}
      </div>
    );

  const {
    doctorId,
    patientId,
    status,
    date,
    time,
    reasonForVisit,
    note,
    rating,
    tokenNo,
    isApproved,
    cancelReason,
    estimatedVisitTime,
    appointmentType,
  } = appointment;

  const isCompleted = status === "completed";
  const isScheduled = status === "scheduled";
  const hasRating = !!rating;
  const hasNote = !!note;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="mb-8 border-b pb-4 flex justify-between items-center">
          <Link
            to="/appointments"
            className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
          >
            &larr; <span className="text-sm font-medium">Back to Appointments</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            Appointment Details
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Appointment Status
              </h2>
              <AppointmentStatusBadge status={status} isApproved={isApproved} />
              {status === "canceled" && cancelReason && (
                <p className="mt-2 text-red-600 text-sm">
                  Cancel Reason: {cancelReason}
                </p>
              )}
            </div>

            <AppointmentSchedule date={date} time={time} tokenNo={tokenNo} />

            {tokenNo && (
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Token Number:</span> {tokenNo}
              </div>
            )}

            {isApproved && status === "scheduled" && estimatedVisitTime && (
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Estimated Visit Time:</span>{" "}
                {new Date(estimatedVisitTime).toLocaleString()}
              </div>
            )}

            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Appointment Type:</span>{" "}
              <span className="capitalize">{appointmentType}</span>
            </div>

            <ConsultationDetails
              reasonForVisit={reasonForVisit}
              note={note}
              isCompleted={isCompleted}
            />
          </div>

          <div className="md:col-span-1 space-y-6">
            {userdata?.user?.role === "patient"
            ?  <DoctorCard doctor={doctorId} />:
             <PatientCard patient={patientId} />
            
            }
           
            <AppointmentActions
              isScheduled={isScheduled}
              isCompleted={isCompleted}
              hasRating={hasRating}
              onRate={() => handleRatingOpen(appointment)}
              onCancel={() => handleCancelOpenAndClose()}
              doctor={doctorId}
              role={userdata?.user?.role}
              hasNote={hasNote}
            />
          </div>
        </div>

        <RatingDisplay rating={rating} />

        {isModalOpen && selectedAppointment && (
          <RatingModal
            appointment={selectedAppointment}
            onClose={handleRatingClose}
            onRatingSubmitted={handleRatingSubmitted}
          />
        )}
        {cancelReasonInput && (
          <CancelAppointment
            id={id}
            token={token}
            onClose={handleCancelOpenAndClose}
            onCancelSubmitted={handleCancelSubmitted}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;
