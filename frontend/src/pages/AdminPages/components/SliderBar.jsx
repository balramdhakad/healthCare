
import React from "react";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../../features/auth/authSlice";
import { FiX } from "react-icons/fi";

const SlideBar = ({ setActiveComponent, isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const menuItems = [
    { label: "Dashboard", key: "dashboard" },
    { label: "Orders", key: "orders" },
    { label: "Doctors", key: "doctors" },
    { label: "Appointments", key: "appointments" },
    { label: "Products", key: "products" },
    { label: "Community", key: "community" },
  ];

  const handleMenuClick = (key) => {
    setActiveComponent(key);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white shadow-lg p-5 flex flex-col transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl font-bold text-blue-600">HealthConnect</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-gray-600 md:hidden"
          >
            <FiX />
          </button>
        </div>

        <nav className="space-y-3 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              className="w-full text-left flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 hover:text-blue-600 font-medium transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => {
            dispatch(logOutUser());
            setIsOpen(false);
          }}
          className="mt-6 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300"
        >
          Logout
        </button>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-40"
        ></div>
      )}
    </>
  );
};

export default SlideBar;
