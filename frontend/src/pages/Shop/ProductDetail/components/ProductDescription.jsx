import React from "react";

const ProductDescription = ({ description }) => (
  <div className="mt-8 p-6 bg-white rounded-xl shadow-xl">
    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">
      Detailed Description
    </h2>
    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
      {description}
    </p>
  </div>
);

export default ProductDescription;
