import React from 'react';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const DoctorInfoSidebar = ({ doctor }) => (
  <div className="lg:w-1/3 space-y-6">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Consultation Info</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center text-gray-700">
          <span>Consultation Fee</span>
          <span className="font-semibold">₹{doctor?.fees}</span>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span>Duration</span>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Contact & Location</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-gray-700">
          <FaEnvelope className="text-lg text-blue-600" />
          <span>{doctor.email}</span>
        </div>
        <div className="flex items-start gap-4 text-gray-700">
          <FaMapMarkerAlt className="text-lg text-blue-600 mt-1 flex-shrink-0" />
          <span>{doctor.clinicAddress}</span>
        </div>
      </div>
    </div>
  </div>
);

export default DoctorInfoSidebar;