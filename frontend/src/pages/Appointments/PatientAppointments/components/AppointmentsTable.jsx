import AppointmentRow from "./AppointmentRow";

const AppointmentsTable = ({ appointments, onRatingOpen }) => {
  const groupByDate = (list) =>
    list.reduce((acc, appt) => {
      const dateKey = appt.date.split("T")[0];
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(appt);
      return acc;
    }, {});

  const groupedAppointments = groupByDate(appointments);
  const sortedDates = Object.keys(groupedAppointments).sort(
    (a, b) => new Date(b) - new Date(a)
  );


  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Token
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Doctor & Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Reason / Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        {/* <tbody className="bg-white divide-y divide-gray-100">
          {sortedDates.length > 0 ? (
            sortedDates.map((dateKey) =>
              groupedAppointments[dateKey].map((appt) => (
                <tr
                  key={appt._id}
                  className="hover:bg-teal-50 transition duration-150"
                >
                  <td className="px-6 py-4 flex whitespace-nowrap text-sm font-bold text-teal-700">
                    <div className="m-1"><button><IoRefreshCircle size={2}/></button></div>
                    <div>
                      {appt.status === "scheduled" &&
                      appt.isApproved &&
                      appt.estimatedVisitTime && (
                        <p className=" text-red-500 mt-1">
                          Estimated: {FormatTime(appt.estimatedVisitTime)}
                        </p>
                      )}
                    Slot : {appt?.time}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                      {appt.tokenNo || "-"}
                    </span>
                  </td>

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
                      <IoCalendarOutline className="mr-1" />{" "}
                      {FormatDate(appt.date)}
                    </p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">
                    <p className="truncate">{appt.reasonForVisit || "N/A"}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center capitalize">
                      <FaVideo className="mr-1 text-teal-600" />{" "}
                      {appt.appointmentType}
                    </p>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={appt.status} />
                  </td>

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
                        <span className="ml-1">
                          {appt.rating?.rating?.toFixed(1)}
                        </span>
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
                No appointments found
              </td>
            </tr>
          )}
        </tbody> */}
        <tbody className="bg-white divide-y divide-gray-100">
          {sortedDates.length > 0 ? (
            sortedDates.map((dateKey) =>
              groupedAppointments[dateKey].map((appt) => (
                <AppointmentRow 
                  key={appt._id} 
                  appt={appt} 
                  onRatingOpen={onRatingOpen} 
                />
              ))
            )
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default AppointmentsTable;
