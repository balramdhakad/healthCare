import React from "react";
import { FaUserMd, FaVideo, FaMoneyBillWave } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { CgArrowRight } from "react-icons/cg";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import LoadingBar from "../../../../components/LoadingBar";
const AppointmentTable = ({ appointments, isLoading, onActionRequest }) => {
  if (isLoading) {
    return <LoadingBar />;
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-teal-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider w-1/12">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider w-1/12">
              Token
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider w-3/12">
              Patient & Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider w-3/12">
              Reason/Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider w-2/12">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-bold text-teal-800 uppercase tracking-wider w-2/12">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.length > 0 ? (
            appointments.map((appt) => {
              return (
                <tr
                  key={appt._id}
                  className="hover:bg-teal-50/50 transition duration-150"
                >
                  {/* Time */}
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-extrabold text-teal-700">
                    {appt.time}
                  </td>
                  {/* Token No */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                      {appt.tokenNo || "-"}
                    </span>
                  </td>
                  {/* Patient Name & Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-md font-semibold text-gray-900 flex items-center mb-1">
                      <FaUserMd className="mr-2 text-blue-500" />{" "}
                      {appt.patientName}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <IoCalendarOutline className="mr-1" />{" "}
                      {appt.date.split("T")[0]}
                    </p>
                  </td>
                  {/* Reason */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">
                    <p className="truncate">{appt.reasonForVisit || "N/A"}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center capitalize">
                      <FaVideo className="mr-1 text-teal-600" />{" "}
                      {appt.appointmentType}
                    </p>
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={appt.status} />
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {appt.status === "pending" && (
                      <button
                        onClick={() => onActionRequest(appt._id, "Approve")}
                        className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm font-semibold transition"
                      >
                        Approve
                      </button>
                    )}
                    {appt.status === "scheduled" && (
                      <div className="mt-1">
                        <button
                          onClick={() => onActionRequest(appt._id, "Complete")}
                          className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm font-semibold transition mr-2"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => onActionRequest(appt._id, "Cancel")}
                          className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {/* View Details Button */}
                    <Link
                      to={`/patient/appointments/${appt._id}`}
                      className="text-blue-600 hover:text-blue-900 transition flex items-center ml-auto w-fit font-medium border-b border-blue-600 mt-2"
                    >
                      View Details <CgArrowRight className="w-3 h-3 ml-2" />
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                No appointments found for the selected filter/view.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
