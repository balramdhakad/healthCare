import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../../utilus/axiosInstance";
import Pagination from "../components/Pagination";
import OrderFilters from "./components/OrderFilters";
import OrderTable from "./components/OrderTable";
import LoadingBar from "../../../components/LoadingBar";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    orderStatus: "",
    paymentStatus: "",
    search: "",
  });

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const { orderStatus, paymentStatus, search } = filters;

      const res = await axiosInstance.get("/admin/orders", {
        params: { page, orderStatus, paymentStatus, search },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, filters, token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusUpdate = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/admin/orders/${id}/status`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success("Order status updated successfully!");
        fetchOrders();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to update order status");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Manage Orders</h1>
        </div>

        <OrderFilters filters={filters} setFilters={setFilters} setPage={setPage} />

        {loading ? (
          <div className="flex justify-center items-center py-10 text-blue-600">
            <LoadingBar/>
          </div>
        ) : (
          <>
            <OrderTable orders={orders} onUpdate={handleStatusUpdate} />

            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
