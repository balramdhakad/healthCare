const AppointmentStatusBadge = ({ status, isApproved }) => {
  let className = "bg-gray-100 text-gray-700 border-gray-300";
  let text = "N/A";

  if (status === "scheduled") {
    className = isApproved
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-yellow-100 text-yellow-700 border-yellow-300";
    text = isApproved ? "Confirmed" : "Pending Approval";
  } else if (status === "completed") {
    className = "bg-blue-100 text-blue-700 border-blue-300";
    text = "Completed";
  } else if (status === "canceled") {
    className = "bg-red-100 text-red-700 border-red-300";
    text = "Canceled";
  }

  return (
    <span
      className={`inline-flex items-center px-4 py-2 text-lg font-bold rounded-full border-2 ${className}`}
    >
      {text}
    </span>
  );
};

export default AppointmentStatusBadge;
