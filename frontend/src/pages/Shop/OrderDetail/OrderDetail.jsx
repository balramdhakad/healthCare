import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utilus/axiosInstance";
import LoadingBar from "../../../components/LoadingBar";
import FormatDate from "../../../components/FormateDate";
import OrderItemDisplay from "./components/OrderItemDisplay";
import AddressCard from "./components/AddressCard";
import OrderSummary from "./components/OrderSummary";
import PaymentMethodCard from "./components/PaymentMethodCard";

const OrderDetail = () => {
  const { id: orderId } = useParams();
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    if (!token) {
      setError("Authentication token missing. Please log in.");
      setLoading(false);
      return;
    }
    if (!orderId) {
      setError("Order ID is missing from the URL.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(response.data.data);
      console.log(response.data.data);
      
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId, token]);

  if (loading) return <LoadingBar />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">No order found.</p>
      </div>
    );

  const calculatedSubtotal = order.items.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );
  const taxAmount = order.total_amount - calculatedSubtotal;

  //TODO : manything related to payment after implimentation of payment gateway
  
  const displayPaymentMethod = order.payment_method || "N/A";
  const last4Digits = order.payment_method?.match(/\d{4}$/)
    ? order.payment_method.match(/\d{4}$/)[0]
    : "XXXX";
  const paymentMethodText = displayPaymentMethod.includes("Credit Card")
    ? `Credit Card ending in ${last4Digits}`
    : displayPaymentMethod;

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Order Details
          </h1>
          <p className="mt-2 text-md text-gray-600">
            Order #{order._id ? order._id.slice(0, 8).toUpperCase() : "N/A"} •
            Placed on {FormatDate(order.createdAt)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Items</h2>
              {order.items.map((item) => (
                <OrderItemDisplay key={item.product_id?._id} item={item} />
              ))}
            </div>

            <AddressCard title="Shipping Address" address={order.shipping_address_id} />
            <AddressCard title="Billing Address" address={order.billing_address_id} />
          </div>

          <div className="lg:col-span-1 space-y-8">
            <OrderSummary
              order={order}
              calculatedSubtotal={calculatedSubtotal}
              taxAmount={taxAmount}
            />
            <PaymentMethodCard paymentMethodText={paymentMethodText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
