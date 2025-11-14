import React from "react";

const OverviewCards = ({ counts }) => {
  const items = [
    { label: "Orders", value: counts.orders },
    { label: "Doctors", value: counts.doctors },
    { label: "Appointments", value: counts.appointments },
    { label: "Products", value: counts.products },
    { label: "Community", value: counts.community },
  ];

  return (
    <div className="mb-8 p-1">
      <h2 className="text-xl font-semibold mb-3">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-white shadow-sm rounded-lg p-4 text-center"
          >
            <p className="text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;
