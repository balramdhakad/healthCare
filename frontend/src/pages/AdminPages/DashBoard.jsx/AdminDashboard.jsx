import React, { useState, useEffect } from "react";
import OverviewCards from "../components/OverviewCards";
import Community from "../Community/Community";
import axiosInstance from "../../../utilus/axiosInstance";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SlideBar from "../components/SliderBar";
import QuickActions from "../components/QuickActions";
import { useNavigate } from "react-router-dom";
import Products from "../Products/Products";
import Doctors from "../Doctors/Doctors";
import Orders from "../Orders/Orders";
import Appointments from "../Appointments/Appointments";
import { MdOutlineMenu } from "react-icons/md";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    orders: 0,
    doctors: 0,
    appointments: 0,
    products: 0,
    community: 0,
  });

  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userdata) navigate("/login");
    if (userdata && userdata?.user?.role !== "admin") {
      toast.error("Access Denied");
      navigate("/");
    }
  }, [userdata]);

  const fetchCounts = async () => {
    try {
      const response = await axiosInstance.get("/admin/dashboard-counts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCounts(response.data);
    } catch {
      toast.error("Error fetching dashboard counts");
    }
  };

  useEffect(() => {
    if (userdata?.user?.role === "admin") fetchCounts();
  }, [token]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "doctors":
        return <Doctors token={token} />;
      case "orders":
        return <Orders token={token} />;
      case "products":
        return <Products token={token} />;
      case "appointments":
        return <Appointments token={token} />;
      case "community":
        return <Community token={token} />;
      default:
        return (
          <>
            <OverviewCards counts={counts} />
            <QuickActions setActiveComponent={setActiveComponent} />
          </>
        );
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <SlideBar
        setActiveComponent={setActiveComponent}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >

        <div className="md:hidden flex items-center justify-between bg-white p-4 shadow fixed top-0 left-0 right-0 z-30">
          <h2 className="text-xl font-bold text-blue-600">HealthConnect</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 text-2xl focus:outline-none"
          >
            <MdOutlineMenu />
          </button>
        </div>

        <main
          className="flex-1 overflow-hidden md:p-4 mt-16 md:mt-0 "
        >

          {activeComponent === "dashboard" && (
            <p className="text-gray-500 mb-6">
              An overview of key metrics and quick actions.
            </p>
          )}
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 