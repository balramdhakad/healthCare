import React from "react";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/shop/product/${product._id}`}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:-translate-y-1"
    >
      <div className="relative w-full object-contain h-30 overflow-hidden">
        <img
          src={product?.image_url}
          alt={product?.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product?.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {product?.description || "No description available"}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="flex items-center text-lg font-bold text-gray-900">
            <FaRupeeSign className="text-sm mr-1" />
            {product?.price?.toFixed(2)}
          </span>

          <button className="text-sm px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all">
            View
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
