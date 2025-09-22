import React from 'react';
import { FaUserClock, FaDollarSign } from 'react-icons/fa';
import defaultImage from "../../../assets/doctor.jpeg"
import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor}) => (
  <Link to={`/doctor/${doctor?._id}`} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-4 transition-transform duration-300 hover:scale-105">
    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
      <img
        src={doctor?.profilePic ||defaultImage}
        alt={`Dr. ${doctor?.name}`}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-grow text-center sm:text-left">
      <h2 className="text-xl font-bold text-gray-900">{doctor?.name}</h2>
      <p className="text-sm text-gray-500 font-medium capitalize">{doctor?.specialization}</p>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4 mt-2">
        <div className="flex items-center gap-1 text-gray-600">
          <FaUserClock className="h-5 w-5" />
          <span className="font-semibold">{doctor?.experience}</span>
          <span className="text-sm text-gray-500">Yrs Exp.</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <FaDollarSign className="h-5 w-5" />
          <span className="font-semibold">{doctor?.fees}</span>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        <span className="font-semibold text-gray-700">Appointment Types:</span>{" "}
        {doctor.appointmentTypes?.join(", ")}
      </div>
    </div>
    <div className="mt-4 sm:mt-0 flex-shrink-0 w-full sm:w-auto">
      <Link to={`/booking/${doctor._id}`} 
        className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Book Appointment
      </Link>
    </div>

    
  </Link>
);

export default DoctorCard;