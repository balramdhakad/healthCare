import { Link } from "react-router-dom";

const AppointmentCard = ({ appointment, onViewDetails, onRatingOpen }) => {
  const doctorName = appointment.doctorId?.name || "Dr. N/A";
  const doctorSpecialization = appointment.doctorId?.specialization || "";
  const timeRange = appointment.time;
  const status = appointment.status;
  const isCompleted = status === "completed";
  const hasRating = !!appointment.rating;
  let statusBadgeClass = "";
  let statusText = "";

  if (status === "scheduled") {
    statusBadgeClass = "bg-green-100 text-green-700";
    statusText = appointment.isApproved ? "Confirmed" : "Pending";
  } else if (status === "completed") {
    statusBadgeClass = "bg-gray-100 text-gray-600";
    statusText = "Completed";
  } else if (status === "canceled") {
    statusBadgeClass = "bg-red-100 text-red-700";
    statusText = "Canceled";
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition duration-150 border-b">
      <div className="flex items-center space-x-4">
        <img
          src={appointment.doctorId?.profilePic}
          alt={`Dr. ${doctorName}`}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            {/* Link to Doctor Profile */}
            <Link to={`/doctor/${appointment.doctorId?._id}`} className="hover:text-blue-600 transition-colors">
              Dr. {doctorName}
            </Link>
          </span>
          <span className="text-sm text-gray-500">{doctorSpecialization}</span>
          <span className="text-sm font-medium text-gray-700 mt-1">
            {timeRange}
          </span>
        </div>
      </div>

      {/* Status and Actions */}
      <div className="flex items-center space-x-3">
        {/* Status Badge */}
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${statusBadgeClass}`}
        >
          {statusText}
        </span>

        {/* Rating Button */}
        {isCompleted && !hasRating && (
          <button
            onClick={() => onRatingOpen(appointment)} 
            className="px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Rating
          </button>
        )}
        {isCompleted && hasRating && (
          <span className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">
            Rated
          </span>
        )}

        {/* View Details Button */}
        <Link to={`/patient/appointments/${appointment._id}`}>
          <button
            className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors 
            ${
              isCompleted
                ? "bg-blue-400 hover:bg-blue-500"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};
export default AppointmentCard;