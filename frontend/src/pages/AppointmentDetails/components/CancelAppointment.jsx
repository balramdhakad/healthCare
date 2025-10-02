import React, { useState } from "react";
import axiosInstance from "../../../utilus/axiosInstance";
import toast from "react-hot-toast";

const CancelAppointment = ({ id, token, onClose, onCancelSubmitted }) => {
  const [cancelReason, setCancelReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const cancelAppointment = async () => {
    if (!cancelReason.trim()) {
      setIsError("Please provide a reason for cancellation");
      return;
    }

    setIsLoading(true);
    setIsError("");
    try {
      const response = await axiosInstance.put(
        `/appointment/${id}`,
        { status: "canceled", cancelReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onCancelSubmitted(id, response.data?.data?.cancelReason);
      toast.success("Appointment Cancelled!");
      onClose();
    } catch (error) {
      setIsError(error?.response?.data?.message || "Something went wrong");
      toast.error("error?.response?.data?.message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-3">Cancel Appointment</h2>

        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={3}
          placeholder="Reason for cancellation"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />

        {isError && <p className="text-red-500 text-sm mb-2">{isError}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={cancelAppointment}
            disabled={isLoading}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {isLoading ? "Canceling..." : "Confirm Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointment;
