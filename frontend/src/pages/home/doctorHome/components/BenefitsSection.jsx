import React from "react";
import { FaStar } from "react-icons/fa";
import { CgGlobe } from "react-icons/cg";
import { IoBarChart } from "react-icons/io5";

const benefits = [
  {
    icon: <FaStar className="w-10 h-10 text-yellow-500" />,
    title: "Authentic Ratings & Feedback",
    description:
      "Receive verified, constructive feedback from patients to continuously improve service quality and build trust.",
    borderColor: "border-yellow-500",
  },
  {
    icon: <CgGlobe className="w-10 h-10 text-[#06b6d4]" />,
    title: "Expand Professional Network",
    description:
      "Access exclusive physician groups and forums for collaboration, case discussion, and professional development.",
    borderColor: "border-[#06b6d4]",
  },
  {
    icon: <IoBarChart className="w-10 h-10 text-indigo-500" />,
    title: "Access Patient Medical History",
    description:
      "Access complete patient medical history instantly during treatment for safer, accurate care.",
    borderColor: "border-indigo-500",
  },
];

const BenefitsSection = () => {
  return (
    <section id="network" className="py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Maximize Your Professional Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`p-6 bg-white rounded-xl shadow-lg border-b-4 ${benefit.borderColor} transform transition duration-300 hover:-translate-y-1`}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
