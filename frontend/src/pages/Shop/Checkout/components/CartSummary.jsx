import React from "react";

const CartSummary = ({ cartItems }) => {
  return (
    <div className="mb-6 border rounded-lg p-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-2 text-teal-700">
        Cart Summary
      </h3>
      {cartItems.length > 0 ? (
        <ul className="divide-y">
          {cartItems.map((item) => (
            <li key={item.product_id._id} className="py-3 flex justify-between">
              <div>
                <p className="font-semibold">{item.product_id.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} × ₹{item.product_id.price}
                </p>
              </div>
              <p className="font-bold text-teal-700">
                ₹{item.quantity * item.product_id.price}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No items in cart.</p>
      )}
    </div>
  );
};

export default CartSummary;
