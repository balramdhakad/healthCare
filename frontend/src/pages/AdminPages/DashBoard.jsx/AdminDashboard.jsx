import React, { useState, useEffect } from "react";
import OverviewCards from "../components/OverviewCards";
import Doctors from "../components/Doctors";
import Orders from "../components/Orders";
import Products from "../components/Products";
import Community from "../components/Community";
import axiosInstance from "../../../utilus/axiosInstance";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SlideBar from "../components/SliderBar";
import QuickActions from "../components/QuickActions";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    orders: 0,
    doctors: 0,
    appointments: 0,
    products: 0,
    community: 0,
  });

  const [activeComponent, setActiveComponent] = useState("dashboard");

  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userdata) {
      navigate("/login");
    }
    if (userdata && !(userdata?.user?.role === "admin")) {
      toast.error("Access Denied")
      navigate("/");
    }
  }, [userdata]);

  const fetchCounts = async () => {
    try {
      const response = await axiosInstance.get("/admin/dashboard-counts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCounts(response.data);
    } catch (error) {
      toast.error("Error fetching dashboard counts");
    }
  };

  useEffect(() => {
    if (!(userdata?.user?.role === "admin")) return;
    fetchCounts();
  }, [token]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "doctors":
        return <Doctors token={token} />;
      case "orders":
        return <Orders token={token} />;
      case "products":
        return <Products token={token} />;
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
    <div className="flex min-h-screen bg-gray-50">
      <SlideBar setActiveComponent={setActiveComponent} />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {activeComponent.charAt(0).toUpperCase() + activeComponent.slice(1)}
        </h1>
        <p className="text-gray-500 mb-6">
          {activeComponent === "dashboard"
            ? "An overview of key metrics and quick actions."
            : ""}
        </p>
        {renderComponent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
