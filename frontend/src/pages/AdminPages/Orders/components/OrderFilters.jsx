import React from "react";
import { FaSearch } from "react-icons/fa";

const AllOrderStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"];
const AllPaymentStatuses = ["Pending", "Paid", "Failed", "Refunded"];

const OrderFilters = ({ filters, setFilters, setPage }) => {
  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-3.5 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by User ID or Order ID"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        {/* Order Status */}
        <div>
          <select
            className="w-full p-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={filters.orderStatus}
            onChange={(e) => handleChange("orderStatus", e.target.value)}
          >
            <option value="">All Order Statuses</option>
            {AllOrderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Status */}
        <div>
          <select
            className="w-full p-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={filters.paymentStatus}
            onChange={(e) => handleChange("paymentStatus", e.target.value)}
          >
            <option value="">All Payment Statuses</option>
            {AllPaymentStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;
