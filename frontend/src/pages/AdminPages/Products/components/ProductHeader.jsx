import React from "react";

const ProductHeader = ({ bestSellerFilter, onFilterChange }) => {
  const getClasses = (current) =>
    `px-4 py-2 text-sm font-medium rounded-md transition duration-150 ${
      bestSellerFilter === current
        ? "bg-blue-600 text-white shadow-md"
        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
    }`;

  return (
    <div className="flex space-x-3 mb-6">
      <button onClick={() => onFilterChange("all")} className={getClasses("all")}>
        All Products
      </button>
      <button onClick={() => onFilterChange("true")} className={getClasses("true")}>
        Best Sellers Only
      </button>
      <button onClick={() => onFilterChange("false")} className={getClasses("false")}>
        Non-Best Sellers
      </button>
    </div>
  );
};

export default ProductHeader;
