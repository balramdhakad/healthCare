import React from "react";

const OrderSummary = ({
  subtotal,
  shipping,
  taxes,
  total,
  handleCheckoutbtn,
}) => {
  return (
    <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6 mt-6 lg:mt-0">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>₹{shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Taxes</span>
        <span>₹{taxes.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Estimated Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <button onClick={handleCheckoutbtn} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-bold">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
