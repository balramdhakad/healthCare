import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="flex justify-center mt-6">
    <div className="relative w-full max-w-4xl">
      <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search Products, category, services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-4 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  </div>
);

export default SearchBar;
