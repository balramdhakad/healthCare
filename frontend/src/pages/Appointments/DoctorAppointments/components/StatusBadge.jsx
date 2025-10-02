import React from "react";
import { FaClock, FaCheckCircle, FaHourglass } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

const StatusBadge = ({ status }) => {
  let classes = "px-3 py-1 text-xs font-semibold rounded-full border w-fit flex items-center space-x-1 capitalize";
  let icon;

  switch (status) {
    case "scheduled":
      classes += " bg-teal-100 text-teal-800 border-teal-300";
      icon = <FaClock className="w-3 h-3" />;
      break;
    case "completed":
      classes += " bg-blue-100 text-blue-800 border-blue-300";
      icon = <FaCheckCircle className="w-3 h-3" />;
      break;
    case "pending":
      classes += " bg-yellow-100 text-yellow-800 border-yellow-300";
      icon = <FaHourglass className="w-3 h-3" />;
      break;
    case "canceled":
      classes += " bg-red-100 text-red-800 border-red-300";
      icon = <AiOutlineCloseCircle className="w-3 h-3" />;
      break;
    default:
      classes += " bg-gray-100 text-gray-700 border-gray-300";
      icon = <FaClock className="w-3 h-3" />;
  }

  return (
    <span className={classes}>
      {icon}
      <span>{status === "pending" ? "Pending Approval" : status}</span>
    </span>
  );
};

export default StatusBadge;
