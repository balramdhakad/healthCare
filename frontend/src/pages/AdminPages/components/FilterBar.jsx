import React from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

const FilterBar = ({
  search,
  categoryFilter,
  onSearchChange,
  onCategoryChange,
  productCategories,
  onCreate,
}) => (
  <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
    <div className="flex space-x-4 w-full max-w-4xl">
      <div className="relative w-1/2">
        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Name, Brand, Manufacturer..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {productCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>

    <button
      onClick={onCreate}
      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition shadow-md"
    >
      <FaPlus />
      <span>Add New Product</span>
    </button>
  </div>
);

export default FilterBar;
