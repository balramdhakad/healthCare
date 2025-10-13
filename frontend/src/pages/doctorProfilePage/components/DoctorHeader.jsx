import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../assets/doctor.jpeg";
import { useSelector } from "react-redux";
const DoctorHeader = ({ doctor }) => {
  const { userdata } = useSelector((state) => state.auth);
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-6">
      <img
        src={doctor?.profilePic || defaultImage}
        alt={doctor?.name}
        className="w-30 h-30 object-contain rounded-full border-4 border-blue-200"
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

      {userdata?.user?.role === "admin" ? (
        <></>
      ) : (
        <Link
          to={`/booking/${doctor.id}`}
          className="px-3 py-2 bg-blue-400 text-white font-semibold rounded-sm hover:bg-blue-700 transition-colors"
        >
          Book Appointment
        </Link>
      )}
    </div>
  );
};
export default DoctorHeader;
