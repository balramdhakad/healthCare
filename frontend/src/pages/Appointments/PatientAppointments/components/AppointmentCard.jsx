import { FaStar, FaXing } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdCheckCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const AppointmentCard = ({ appointment, onViewDetails, onRatingOpen }) => {

  const doctorName = appointment?.doctorId?.name || "Dr. N/A";
  const doctorSpecialization = appointment?.doctorId?.specialization || "General Practitioner";
  const timeRange = appointment?.time || "Time N/A";
  const status = appointment?.status;
  const isCompleted = status === "completed";
  const hasRating = !!appointment?.rating; 

  const ratingScore = appointment?.rating?.rating || appointment?.rating || 0;

  let statusBadgeClass = "";
  let statusText = "";
  let statusIcon = null;
  if (status === "scheduled") {
    statusBadgeClass = "bg-green-100 text-green-700 border-green-300";
    statusText = appointment?.isApproved ? "Confirmed" : "Pending";
    statusIcon = <MdCheckCircleOutline className="w-3 h-3" />;
  } else if (status === "completed") {
    if (!hasRating) {
        statusBadgeClass = "bg-gray-100 text-gray-600 border-gray-300";
        statusText = "Completed";
    }
    statusIcon = <MdCheckCircleOutline className="w-3 h-3" />;
  } else if (status === "canceled") {
    statusBadgeClass = "bg-red-100 text-red-700 border-red-300";
    statusText = "Canceled";
    statusIcon = <FaXing className="w-3 h-3" />;
  }
  if (!appointment) {
      return null;
  }

  return (

    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 sm:p-6 bg-white hover:bg-gray-50 transition duration-150 border-b rounded-xl shadow-sm">

      <div className="flex items-center space-x-4 w-full md:w-auto">
        <img
          src={appointment.doctorId?.profilePic || "https://placehold.co/56x56/a0aec0/ffffff?text=DR"}
          alt={`Dr. ${doctorName}`}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-gray-900 truncate">

            <Link 
              to={`/doctor/${appointment.doctorId?._id}`} 
              className="hover:text-blue-600 transition-colors text-lg"
            >
              Dr. {doctorName}
            </Link>
          </span>
          <span className="text-sm text-gray-500 truncate">{doctorSpecialization}</span>
          <span className="text-sm font-medium text-gray-700 mt-1">
            {timeRange}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto mt-4 md:mt-0">

        {(!isCompleted || (status === "completed" && !hasRating)) && (
            <span
                className={`
                    flex items-center justify-center space-x-1
                    px-3 py-2 text-sm font-medium rounded-full border 
                    ${statusBadgeClass}
                    w-full sm:w-auto
                `}
            >
                {statusIcon}
                <span>{statusText}</span>
            </span>
        )}

        {isCompleted && !hasRating && (
          <button
            onClick={() => onRatingOpen(appointment)} 
            className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-1"
          >
            <FaPencil className="w-3 h-3" />
            <span>Rate</span>
          </button>
        )}

        {isCompleted && hasRating && (
          <span className="w-full sm:w-auto text-center px-3 py-2 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-lg border border-yellow-300 flex items-center justify-center space-x-1">
            <FaStar className="w-3 h-3 fill-yellow-500 text-yellow-500" /> 
            <span className="ml-1">{ratingScore.toFixed(1)}</span>
          </span>
        )}
        <Link 
          to={`/patient/appointments/${appointment?._id}`}
          className="w-full sm:w-auto" 
        >
          <button
            className={`
              w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors
              ${
                isCompleted
                  ? "bg-blue-400 hover:bg-blue-500"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentCard;
