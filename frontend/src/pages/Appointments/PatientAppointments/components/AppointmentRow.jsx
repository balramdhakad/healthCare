import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaVideo, FaStar } from "react-icons/fa";
import { IoCalendarOutline, IoRefreshCircle } from "react-icons/io5";
import { CgArrowRight } from "react-icons/cg";
import FormatDate from "../../../../components/FormateDate";
import StatusBadge from "../../DoctorAppointments/components/StatusBadge";
import FormatTime from "../../../../components/FormatTime";
import axiosInstance from "../../../../utilus/axiosInstance";
import { useSelector } from "react-redux";

const AppointmentRow = ({ appt, onRatingOpen }) => {
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;

  const [estimatedVisitTime, setEstimatedVisitTime] = useState(
    appt?.estimatedVisitTime || null
  );
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/appointment/${appt._id}/track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.success) {
        setEstimatedVisitTime(res.data.data.estimatedVisitTime);
      }
    } catch (error) {
      console.log("Error tracking appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={appt._id} className="hover:bg-teal-50 transition duration-150">
      <td className="px-6 py-4 flex whitespace-nowrap text-sm font-bold text-teal-700">
        <div className="m-1">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="disabled:opacity-50"
          >
            <IoRefreshCircle
              size={20}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>
        <div>
          {appt.status === "scheduled" &&
            appt.isApproved &&
            estimatedVisitTime && (
              <p className="text-red-500 mt-1">
                Estimated: {FormatTime(estimatedVisitTime)}
              </p>
            )}
          Slot : {appt?.time}
        </div>
      </td>

      {/* Token Column */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
          {appt.tokenNo || "-"}
        </span>
      </td>

      {/* Doctor & Date Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <Link
          to={`/doctor/${appt.doctorId._id}`}
          className="text-md font-semibold text-gray-900 flex items-center mb-1"
        >
          {appt?.doctorId?.profilePic ? (
            <img
              src={appt.doctorId?.profilePic}
              alt=""
              className="h-8 w-10 rounded-full"
            />
          ) : (
            <FaUserMd className="mr-2 text-blue-500" />
          )}
          {appt.doctorId.name}
        </Link>
        <p className="text-xs text-gray-500 flex items-center">
          <IoCalendarOutline className="mr-1" /> {FormatDate(appt.date)}
        </p>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">
        <p className="truncate">{appt.reasonForVisit || "N/A"}</p>
        <p className="text-xs text-gray-500 mt-1 flex items-center capitalize">
          <FaVideo className="mr-1 text-teal-600" /> {appt.appointmentType}
        </p>
      </td>

      {/* Status Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={appt.status} />
      </td>

      {/* Actions Column */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 flex justify-end items-center">
        <Link
          to={`/patient/appointments/${appt._id}`}
          className="text-blue-600 hover:text-blue-900 transition flex items-center font-medium border-b border-blue-600"
        >
          View Details <CgArrowRight className="w-3 h-3 ml-2" />
        </Link>

        {appt.status === "completed" && !appt.rating && (
          <button
            onClick={() => onRatingOpen(appt)}
            className="ml-2 bg-teal-600 text-white px-3 py-1 rounded-full text-sm flex items-center hover:bg-teal-700 transition"
          >
            <FaStar className="mr-1" /> Give Feedback
          </button>
        )}

        {appt.status === "completed" && appt.rating && (
          <span className="w-full sm:w-auto text-center px-3 py-2 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-lg border border-yellow-300 flex items-center justify-center space-x-1">
            <FaStar className="w-3 h-3 fill-yellow-500 text-yellow-500" />
            <span className="ml-1">{appt.rating?.rating?.toFixed(1)}</span>
          </span>
        )}
      </td>
    </tr>
  );
};

export default AppointmentRow;
