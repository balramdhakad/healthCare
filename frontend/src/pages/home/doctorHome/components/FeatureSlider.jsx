import React, { useState, useEffect } from "react";
import { CgCalendar, CgShoppingCart } from "react-icons/cg";
import { FaUserSecret } from "react-icons/fa";
import { Link } from "react-router-dom";
import appointment from "../../../../assets/appointment.png";
import community1 from "../../../../assets/community1.png";
import order from "../../../../assets/order.jpg";

const features = [
  {
    icon: <CgCalendar />,
    color: "text-[#10b981]",
    title: "Manage Appointments Easily",
    description:
      "Intuitive interface to view, schedule, and reschedule all your consultations, minimizing no-shows and optimizing your time.",
    borderColor: "hover:border-[#10b981]/50",
    imageUrl: appointment,
    button: "Manage Appointment",
    navLink: "/appointments",
  },
  {
    icon: <FaUserSecret />,
    color: "text-[#06b6d4]",
    title: "Join Community to Grow Network",
    description:
      "Collaborate securely with medical peers, refer patients, and stay updated on the latest research and case studies.",
    borderColor: "hover:border-[#06b6d4]/50",
    imageUrl: community1,
    button: "Explore Community",
    navLink: "/community",
  },
  {
    icon: <CgShoppingCart />,
    color: "text-indigo-500",
    title: "Order Supplies & Services",
    description:
      "Access integrated services to order medical supplies, lab tests, or specialized equipment directly through the platform.",
    borderColor: "hover:border-indigo-500/50",
    imageUrl: order,
    button: "Order Now",
    navLink: "/order",
  },
];

const FeatureSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="py-16 bg-gray-50 mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Your Practice, Simplified: Core Features
        </h2>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0  rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:shadow-xl ${feature.borderColor}`}
              >
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-100 p-5 object-contain rounded-t-xl"
                />
                <div className="p-6">
                  <div className={`w-8 h-8  ${feature.color} mb-2`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                <Link
                  to={feature.navLink}
                  className="m-5 block rounded-lg bg-blue-400 px-3 py-1.5 text-center text-white"
                >
                  {feature.button}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-4 lg:hidden">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-[#10b981] w-6" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSlider;
