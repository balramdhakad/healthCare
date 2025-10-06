import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  let categoryType = category.name;
  return (
    <Link
      to={"/shop/find"}
      state={{ categoryType: category.name }}
      className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <img
        src={category.image_url}
        alt={category.name}
        className="w-full h-full object-bottom object-cover "
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-white text-lg font-semibold">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
