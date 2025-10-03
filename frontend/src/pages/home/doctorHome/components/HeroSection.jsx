import React from "react";
import { MdLocalActivity } from "react-icons/md";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-4">
            Optimize Your Practice.{" "}
            <span className="text-[#10b981]">Empower Your Care.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The unified platform designed for modern medical professionals to
            manage patient flow, connect with peers, and elevate consultation
            quality.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to={"/appointments"}
              className="bg-[#06b6d4] text-white font-semibold py-3 px-6 rounded-xl shadow-xl transition duration-300 hover:bg-cyan-600 text-center"
            >
              Start Patient Consultation
            </Link>
            <Link
              to={"/community"}
              className="border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 hover:bg-gray-50 text-center"
            >
              Explore Community
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="w-64 h-64 sm:w-80 sm:h-80 bg-[#10b981]/10 rounded-3xl flex items-center justify-center shadow-2xl">
            <MdLocalActivity className="text-[#10b981] w-20 h-20 opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
