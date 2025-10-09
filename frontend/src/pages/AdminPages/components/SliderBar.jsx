import React from "react";

const SlideBar = ({ setActiveComponent }) => {
  const menuItems = [
    { label: "Dashboard", key: "dashboard" },
    { label: "Orders", key: "orders" },
    { label: "Doctors", key: "doctors" },
    { label: "Appointments", key: "appointments" },
    { label: "Products", key: "products" },
    { label: "Community", key: "community" },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-blue-600">HealthConnect</h2>
      <nav className="space-y-3 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveComponent(item.key)}
            className="w-full text-left flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 font-medium"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SlideBar;
