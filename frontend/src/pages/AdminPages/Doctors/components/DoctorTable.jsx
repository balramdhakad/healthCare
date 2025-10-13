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
      <div className="grid grid-cols-4 font-semibold border-gray-300 border-b p-4 text-gray-700">
        <span>NAME</span>
        <span>EMAIL</span>
        <span>SPECIALIZATION</span>
        <span className="text-right">ACTIONS</span>
      </div>

      {doctors.map((doc) => (
        <div
          key={doc._id}
          className="grid grid-cols-4 items-center border-b p-4 border-gray-300 hover:bg-gray-50 transition"
        >
          <span className="font-medium text-gray-800">Dr. {doc.name}</span>
          <span className="text-gray-600 text-sm">{doc.email}</span>
          <span className="text-gray-600 text-sm">
            {doc.specialization || "N/A"}
          </span>

          <div className="flex justify-end space-x-2">
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
        </div>
      ))}
    </div>
  );
};

export default DoctorTable;
