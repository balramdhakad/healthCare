import React from "react";
import { FaFilter, FaSort } from "react-icons/fa";

const FilterBar = ({
  categoryFilter,
  setcategoryFilter,
  sortBy,
  setSortBy,
  categorys,
}) => (
  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
    <div className="relative">
      <FaFilter className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
      <select
        value={categoryFilter}
        onChange={(e) => setcategoryFilter(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700"
      >
        <option value="">All categories</option>
        {categorys.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>
    </div>

    <div className="relative">
      <FaSort className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700"
      >
        <option value="">Sort by</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="price-asc">Price (Low to High)</option>
      </select>
    </div>
  </div>
);

export default FilterBar;
