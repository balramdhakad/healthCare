import React from "react";
import { Link } from "react-router-dom";

const OrderStatus = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Refunded",
];
const PaymentStatus = ["Pending", "Paid", "Failed", "Refunded"];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Processing":
      return "bg-blue-100 text-blue-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    case "Refunded":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const OrderTable = ({ orders, onUpdate }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
      <div className="hidden md:grid grid-cols-7 font-semibold border-b bg-gray-50 p-3 text-gray-700 text-sm">
        <span>Order ID</span>
        <span>User</span>
        <span>Total</span>
        <span>Order Status</span>
        <span>Payment Status</span>
        <span className="col-span-2 text-right">Actions</span>
      </div>

      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div
            key={order._id}
            className={`border-b last:border-none p-3 transition hover:bg-gray-50 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            } flex flex-col md:grid md:grid-cols-7 md:items-center gap-2 md:gap-0`}
          >
            <span className="font-medium text-gray-800 truncate">
              #{order._id.slice(-6)}
            </span>

            <span className="text-gray-600">
              {order.user_id?.name || "N/A"}
            </span>

            <span className="font-semibold text-gray-800">
              ₹{order.total_amount?.toFixed(2) || "0.00"}
            </span>

            <div className="text-sm">
              <select
                className={`border border-gray-200 rounded-md p-1.5 text-sm focus:ring-blue-500 focus:border-blue-500 ${getStatusColor(
                  order.order_status
                )}`}
                value={order.order_status}
                onChange={(e) =>
                  onUpdate(order._id, { order_status: e.target.value })
                }
              >
                {OrderStatus.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm">
              <select
                className={`border border-gray-200 rounded-md p-1.5 text-sm focus:ring-blue-500 focus:border-blue-500 ${getStatusColor(
                  order.payment_status
                )}`}
                value={order.payment_status}
                onChange={(e) =>
                  onUpdate(order._id, { payment_status: e.target.value })
                }
              >
                {PaymentStatus.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end md:col-span-2 mt-2 md:mt-0">
              <Link
                to={`/orderdetails/${order._id}`}
                className="px-3 py-1 text-sm border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 transition"
              >
                View Details
              </Link>
            </div>

            <div className="md:hidden text-gray-500 text-sm mt-2 space-y-1">
              <div>Order Status: {order.order_status}</div>
              <div>Payment Status: {order.payment_status}</div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-6 text-sm">
          No orders found.
        </p>
      )}
    </div>
  );
};

export default OrderTable;
