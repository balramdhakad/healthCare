import React from "react";
import toast from "react-hot-toast";

const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => {
  const handlePayOnlineHover = () => {
    toast("Function not available yet", { icon: "⚠️" });
  };

  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
      <div className="flex gap-4">
        <button
          className={`px-5 py-2 rounded-lg border ${
            paymentMethod === "Cash on Delivery"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setPaymentMethod("Cash on Delivery")}
        >
          Cash on Delivery
        </button>

        <button
          className={`px-5 py-2 rounded-lg border ${
            paymentMethod === "Online Payment"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          } cursor-not-allowed`}
          onMouseEnter={handlePayOnlineHover}
        >
          Pay Online
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
