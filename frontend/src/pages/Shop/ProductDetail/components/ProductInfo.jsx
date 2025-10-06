import React, { useState } from "react";
import { FaBox, FaInfoCircle, FaUsers } from "react-icons/fa";
import ProductActions from "./ProductActions";

const ProductInfo = ({ product, isInCart, token, setCart }) => {
  return (
    <div className="lg:w-3/5 pt-4">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
          {product?.name}
        </h1>
        {product?.isBestSeller && (
          <span className="text-xs font-semibold px-3 py-1 bg-yellow-500 text-white rounded-full uppercase shadow-md mt-1">
            Best Seller
          </span>
        )}
      </div>

      <p className="text-md text-gray-600 mt-2">
        <span className="font-medium text-gray-700">{product?.brand}</span>{" "}
        | Manufactured by {product?.manufacturer}
      </p>

      <div className="mt-4 border-b pb-4">
        <span className="text-4xl font-bold text-teal-700">
          ₹{Number(product?.price || 0).toFixed(2)}
        </span>
        <span className="text-gray-500 ml-3">(Tax Included)</span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center text-gray-700">
          <FaBox className="w-5 h-5 text-teal-600 mr-3" />
          <strong>Category:</strong>
          <span className="ml-2 capitalize">{product?.category}</span>
        </div>

        <div className="flex items-center text-gray-700">
          <FaInfoCircle className="w-5 h-5 text-teal-600 mr-3" />
          <strong>Dosage/Form:</strong>
          <span className="ml-2">
            {product?.dosage} {product?.form}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <FaUsers className="w-5 h-5 text-teal-600 mr-3" />
          <strong>Generic Name:</strong>
          <span className="ml-2">{product?.generic_name}</span>
        </div>

        <div className="text-gray-700">
          <strong className="block mb-1 text-gray-800">Status:</strong>
          {product.stock_quantity > 10 ? (
            <span className="text-sm font-semibold text-green-600">
              In Stock ({product?.stock_quantity} available)
            </span>
          ) : product.stock_quantity > 0 ? (
            <span className="text-sm font-semibold text-yellow-600">
              Low Stock ({product?.stock_quantity} available)
            </span>
          ) : (
            <span className="text-sm font-semibold text-red-600">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <ProductActions
        product={product}
        isInCart={isInCart}
        token={token}
        setCart={setCart}
      />

    </div>
  );
};

export default ProductInfo;
