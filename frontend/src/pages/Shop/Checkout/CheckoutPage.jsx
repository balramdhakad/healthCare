import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utilus/axiosInstance";
import { useNavigate } from "react-router-dom";
import CartSummary from "./components/CartSummary";
import AddressSelector from "./components/AddressSelector";
import PaymentOptions from "./components/PaymentOptions";

const CheckoutPage = ({ cartItems }) => {
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;
  const [addresses, setAddresses] = useState([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get("/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load addresses");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [token]);

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !billingAddress || !paymentMethod) {
      toast.error("Please select all fields before proceeding");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post(
        "/orders",
        {
          shippingAddressId: shippingAddress,
          billingAddressId: billingAddress,
          paymentMethod,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order placed successfully!");
      navigate("/myorders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Order placement failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Checkout
      </h2>

      <CartSummary cartItems={cartItems} />

      <AddressSelector
        addresses={addresses}
        shippingAddress={shippingAddress}
        setShippingAddress={setShippingAddress}
        billingAddress={billingAddress}
        setBillingAddress={setBillingAddress}
      />

      <PaymentOptions
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <div className="mt-8 text-center">
        <button
          onClick={handlePlaceOrder}
          disabled={loading || !addresses.length}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-teal-600 hover:bg-teal-700 cursor-pointer"
          }`}
        >
          {loading ? "Placing Order..." : "Complete Purchase"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
