import React from "react";
import FormatDate from "../../../../components/FormateDate";
import { Link } from "react-router-dom";

const OrderRow = ({ order }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-gray-100 text-gray-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <tr className="border-b last:border-b-0 hover:bg-gray-50">
      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
        <span className="text-gray-500">#</span>
        {order._id ? order._id.slice(0, 6).toUpperCase() : "N/A"}
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {FormatDate(order.createdAt)}
      </td>
      <td className="py-3 px-4 text-sm text-gray-800 font-medium">
        ${order.total_amount ? order.total_amount.toFixed(2) : "0.00"}
      </td>
      <td className="py-3 px-4 text-sm">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
            order.order_status
          )}`}
        >
          {order?.order_status}
        </span>
      </td>
      <td className="py-3 px-4 text-sm text-gray-600">
        {order?.payment_method || "N/A"}
      </td>
      <td>
              <Link
        to={`/myorders/${order._id}`}
        className="py-3 px-4 text-sm text-teal-600 hover:text-teal-800 cursor-pointer font-medium"
      >
        View Details
      </Link>
      
      </td>

    </tr>
  );
};

export default OrderRow;
