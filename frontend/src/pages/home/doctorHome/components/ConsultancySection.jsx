import React from "react";
import { FaBuilding, FaCheckCircle, FaVideo } from "react-icons/fa";

const consultancy = [
  {
    icon: <FaBuilding className="w-10 h-10 text-[#10b981]" />,
    title: "In-Clinic / Offline Consultancy",
    description:
      "Manage your physical waiting room and appointment queues efficiently. Access patient records instantly during in-person visits.",
    borderColor: "border-[#10b981]/50",
    features: [
      "Real-time queue management",
      "Digital intake forms",
      "Integrated Online Payment Gateway",
    ],
  },
  {
    icon: <FaVideo className="w-10 h-10 text-[#06b6d4]" />,
    title: "Video Call Consultancy",
    description:
      "Secure, high-quality video sessions to consult with patients remotely, increasing accessibility and geographical reach.",
    borderColor: "border-[#06b6d4]/50",
    features: [
      "End-To-End Secure VideoCall",
      "Integrated prescription sending",
      "Live Chatting With Patient During Videocall",
    ],
  },
];

const ConsultancySection = () => {
  return (
    <section id="consultancy" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How Would You Like to See Your Patient Today?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {consultancy.map((item, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl bg-white border-4 shadow-2xl transition duration-500 hover:scale-[1.01] hover:shadow-lg ${item.borderColor}`}
            >
              <div className="flex items-center justify-between mb-4">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-6">{item.description}</p>
              <ul className="space-y-2 text-gray-700">
                {item.features.map((feat, i) => (
                  <li key={i} className="flex items-center">
                    <FaCheckCircle className="w-5 h-5 text-[#10b981] mr-2" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultancySection;
