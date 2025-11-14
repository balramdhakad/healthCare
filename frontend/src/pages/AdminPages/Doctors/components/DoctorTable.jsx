import React from "react";
import { Link } from "react-router-dom";

const DoctorTable = ({ doctors, onVerifyToggle }) => {
  const getVerificationButtonClasses = (isVerified) =>
    `px-3 py-1 rounded-md text-sm transition ${
      isVerified
        ? "bg-red-100 text-red-600 hover:bg-red-200"
        : "bg-green-100 text-green-600 hover:bg-green-200"
    }`;

  if (!doctors.length) {
    return (
      <p className="text-center text-gray-500 py-6">
        No doctors found matching the filters.
      </p>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="hidden md:grid grid-cols-4 font-semibold border-gray-300 border-b p-4 text-gray-700">
        <span>NAME</span>
        <span>EMAIL</span>
        <span>SPECIALIZATION</span>
        <span className="text-right">ACTIONS</span>
      </div>

      {doctors.map((doc) => (
        <div
          key={doc._id}
          className="border-b border-gray-300 hover:bg-gray-50 transition flex flex-col md:grid md:grid-cols-4 md:items-center p-4"
        >

          <span className="font-medium text-gray-800">Dr. {doc.name}</span>

          <span className="text-gray-600 text-sm mt-1 md:mt-0">
            {doc.email}
          </span>


          <span className="text-gray-600 text-sm mt-1 md:mt-0">
            {doc.specialization || "N/A"}
          </span>

          <div className="flex justify-end space-x-2 mt-2 md:mt-0">
            <Link
              to={`/doctor/${doc._id}`}
              className="px-3 py-1 border rounded-md text-blue-600 border-blue-300 hover:bg-blue-50 transition text-sm"
            >
              View
            </Link>
            <button
              onClick={() => onVerifyToggle(doc._id, doc.verified)}
              className={getVerificationButtonClasses(doc.verified)}
            >
              {doc.verified ? "Unverify" : "Verify"}
            </button>
          </div>

          <div className="md:hidden text-gray-500 text-sm mt-2">
            Email: {doc.email} <br />
            Specialization: {doc.specialization || "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorTable;
