import React from "react";
import { CgLock, CgUser } from "react-icons/cg";
import { FaClock, FaMoneyBill } from "react-icons/fa";

const Benefits = () => {
  const benefits = [
    {
      title: "Expert Doctors",
      description: "Connect with highly experienced and trusted doctors.",
      icon: <CgUser/>
    },
    {
      title: "Affordable Care",
      description:
        "Get the best healthcare solutions at pocket-friendly prices.",
      icon: <FaMoneyBill/>,
    },
    {
      title: "Secure & Private",
      description: "Your health records and consultations are always safe.",
      icon: <CgLock/>,
    },
    {
      title: "Time-Saving",
      description: "Save travel time with online consultation options.",
      icon:<FaClock/>,
    },
  ];
  return (
    <div className="py-16 px-6 lg:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">
        Why Choose Us?
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <div className="text-4xl text-blue-900 flex justify-center mb-4">{benefit.icon}</div>
            <h3 className="text-lg font-semibold text-indigo-600">
              {benefit.title}
            </h3>
            <p className="mt-2 text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
