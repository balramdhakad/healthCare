import React from "react";
import { FaCreditCard, FaMoneyBillWave, FaWallet } from "react-icons/fa";

const PaymentMethodCard = ({ paymentMethodText }) => {
  const getIcon = (method) => {
    const lower = method?.toLowerCase();
    if (lower.includes("card"))
      return <FaCreditCard className="text-gray-600 h-6 w-6" />;
    if (lower.includes("cash"))
      return <FaMoneyBillWave className="text-green-600 h-6 w-6" />;
    if (lower.includes("wallet"))
      return <FaWallet className="text-blue-600 h-6 w-6" />;
    return <FaCreditCard className="text-gray-500 h-6 w-6" />;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Payment Method
      </h2>
      <div className="flex items-center space-x-3 text-gray-700">
        {getIcon(paymentMethodText)}
        <span className="capitalize">
          {paymentMethodText || "Not specified"}
        </span>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
