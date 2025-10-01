import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const DoctorInfoSidebar = ({ doctor }) => {
  return (
    <div className="lg:w-1/3 space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
          Consultation Info
        </h3>
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between items-center">
            <span>Consultation Fee</span>
            <span className="font-semibold">₹{doctor.fees}</span>
          </div>
          {doctor.appointmentTypes && (
            <div className="flex justify-between">
              <span>Types</span>
              <span className="capitalize">{doctor.appointmentTypes.join(", ")}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
          Contact & Location
        </h3>
        <div className="space-y-4 text-gray-700">
          {doctor.email && (
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-lg text-blue-600" />
              <span>{doctor.email}</span>
            </div>
          )}
          {doctor.mobileNo && (
            <div className="flex items-center gap-4">
              <FaPhone className="text-lg text-blue-600" />
              <span>{doctor.mobileNo}</span>
            </div>
          )}
          {doctor.clinicAddress && (
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-lg text-blue-600 mt-1 flex-shrink-0" />
              <span>{doctor.clinicAddress}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoSidebar;
