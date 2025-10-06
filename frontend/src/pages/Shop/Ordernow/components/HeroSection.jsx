import React from "react";
import { Link } from "react-router-dom";

export const HeroSection = ({image}) => {
  return (
    <section className="p-1 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-black to-gray-500 rounded-lg overflow-hidden mb-12">
      <div className="w-full md:w-1/2 p-8 md:p-12 text-white text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Your Health, Simplified
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-6 max-w-md mx-auto md:mx-0">
          Discover a curated selection of health products, tailored to your
          needs and recommended by our experts.
        </p>
        <Link to={"/shop/find"} className="bg-white text-teal-600 hover:bg-gray-100 font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-md transition-all duration-300">
          Shop Now
        </Link>
      </div>

      <div className="w-full p-1  md:w-1/2 h-64 md:h-[70vh]">
        <img
          src={image}
          alt="Health Products"
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
    </section>
  );
};
