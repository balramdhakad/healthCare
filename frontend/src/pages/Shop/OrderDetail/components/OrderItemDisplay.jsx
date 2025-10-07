import React from 'react';

const OrderItemDisplay = ({ item }) => {
  if (!item || !item.product_id) {
    return null;
  }

  const product = item.product_id; 

  return (
    <div className="flex items-center space-x-4 mb-4 pb-4 border-b last:border-b-0">
      <img
        src={product?.image_url} 
        alt={product.name}
        className="w-16 h-16 object-cover rounded-md border border-gray-200"
      />
      <div className="flex-grow">
        <p className="font-medium text-gray-800">{product.name}</p>
        <p className="text-sm text-gray-500">{product.dosage || 'N/A'}, Qty: {item.quantity}</p>
      </div>
      <p className="font-semibold text-gray-900">${item.subtotal ? item.subtotal.toFixed(2) : '0.00'}</p>
    </div>
  );
};

export default OrderItemDisplay;