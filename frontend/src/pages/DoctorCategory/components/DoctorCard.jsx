import { FaUserClock, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';
import defaultImage from "../../../assets/doctor.jpeg";
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 flex 2xl:flex-row md:flex-col flex-col items-center justify-between gap-6">

    <div className="flex-shrink-0 flex flex-col sm:flex-row items-center sm:items-start gap-4">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
        <img
          src={doctor?.profilePic || defaultImage}
          alt={`Dr. ${doctor?.name}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col text-center sm:text-left">
        <h2 className="text-xl font-bold text-gray-900">{doctor?.name}</h2>
        <p className="text-sm text-blue-600 font-medium capitalize mt-1">{doctor?.specialization}</p>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mt-2 text-gray-600">
          <div className="flex items-center gap-1">
            <FaUserClock className="h-4 w-4" />
            <span className="font-medium text-sm">{doctor?.experience}</span>
            <span className="text-sm">Yrs Exp.</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRupeeSign className="h-4 w-4" />
            <span className="font-medium text-sm">{doctor?.fees}</span>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-500 flex items-center gap-1 sm:justify-start justify-center">
          <FaCalendarAlt className="h-4 w-4" />
          <span className="font-medium text-gray-700">Appointment Types:</span>{" "}
          {doctor?.appointmentTypes?.join(", ")}
        </div>
        
        {/* Short Description */}
        <p className="mt-2 text-sm text-gray-600 max-w-sm">
          {doctor?.bio}
        </p>
      </div>
    </div>
    
    {/*  Buttons */}
    <div className="flex flex-col lg:flex-row 2xl:flex-col gap-2 w-full md:w-auto">
      <Link to={`/doctor/${doctor._id}`}
        className="w-full px-6 py-2 bg-gray-800 text-center text-white font-medium rounded-lg shadow-md transition-colors duration-300 hover:bg-gray-900 focus:outline-none"
      >
        View Profile
      </Link>
      <Link to={`/booking/${doctor._id}`}
        className="w-full text-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none"
      >
        Book Appointment
      </Link>
    </div>
  </div>
);

export default DoctorCard;