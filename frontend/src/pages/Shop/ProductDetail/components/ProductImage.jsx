import React from "react";

const ProductImage = ({ image_url, name }) => (
  <div className="lg:w-2/5 flex flex-col items-center">
    <img
      src={image_url}
      alt={name}
      className="w-full max-w-md rounded-lg shadow-lg aspect-square object-cover"
    />
  </div>
);

export default ProductImage;
