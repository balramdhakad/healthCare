import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utilus/axiosInstance";
import toast from "react-hot-toast";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.orders);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch orders");
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>Order Component</div>
  );
};

export default Orders;
