import React from "react";

const OrderStatusMap = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

const PaymentStatusMap = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

const getStatusClasses = (status, isPayment = false) => {
  if (isPayment) {
    switch (status) {
      case PaymentStatusMap.PAID:
        return "bg-green-100 text-green-700";
      case PaymentStatusMap.PENDING:
        return "bg-yellow-100 text-yellow-700";
      case PaymentStatusMap.FAILED:
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  } else {
    switch (status) {
      case OrderStatusMap.DELIVERED:
        return "bg-green-100 text-green-700";
      case OrderStatusMap.SHIPPED:
        return "bg-blue-100 text-blue-700";
      case OrderStatusMap.PROCESSING:
        return "bg-yellow-100 text-yellow-700";
      case OrderStatusMap.PENDING:
        return "bg-gray-100 text-gray-700";
      case OrderStatusMap.CANCELLED:
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }
};

const OrderSummary = ({ order, calculatedSubtotal, taxAmount }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
    <div className="space-y-3">
      <div className="flex justify-between items-center text-gray-700">
        <span>Status</span>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
            order.order_status,
            false
          )}`}
        >
          {order.order_status}
        </span>
      </div>
      <div className="flex justify-between items-center text-gray-700">
        <span>Payment Status</span>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
            order.payment_status,
            true
          )}`}
        >
          {order.payment_status}
        </span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span>Subtotal</span>
        <span>
          {calculatedSubtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span>Shipping</span>
        <span>0.00</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span>Tax</span>
        <span>{taxAmount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-lg font-bold text-teal-600">
          {order.total_amount.toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);

export default OrderSummary;
