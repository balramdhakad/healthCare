import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../assets/doctor.jpeg";
const DoctorHeader = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6">
      <img
        src={doctor?.profilePic || defaultImage}
        alt={doctor?.name}
        className="w-24 h-24 rounded-full border-4 border-blue-200"
      />
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-gray-900">{doctor?.name}</h1>
        <p className="text-lg font-medium text-blue-600 mt-1">
          {doctor?.specialization}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {doctor?.experience} years of experience
        </p>
      </div>
      <Link
        to={`/booking/${doctor.id}`}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
      >
        Book Appointment
      </Link>
    </div>
  );
};
export default DoctorHeader;
