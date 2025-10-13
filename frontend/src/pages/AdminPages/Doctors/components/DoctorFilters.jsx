import React from "react";
import { FaSearch } from "react-icons/fa";

const DoctorFilters = ({ tab, search, onSearchChange, onTabChange }) => {
  const getTabClasses = (type) =>
    `pb-2 text-sm font-medium transition duration-150 ${
      tab === type
        ? "border-b-2 border-blue-500 text-blue-600"
        : "text-gray-500 hover:text-gray-800"
    }`;

  return (
    <>
      <div className="relative mb-6">
        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search doctors (Name, Email, Clinic...)"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-lg"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        {["all", "verified", "unverified"].map((type) => (
          <button
            key={type}
            onClick={() => onTabChange(type)}
            className={getTabClasses(type)}
          >
            {type === "verified"
              ? "Verified Doctors"
              : type === "unverified"
              ? "Unverified Doctors"
              : "All Doctors"}
          </button>
        ))}
      </div>
    </>
  );
};

export default DoctorFilters;
