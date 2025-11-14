import { useState, useEffect } from "react";
import healthImage from "../../../../assets/health.png";
import community from "../../../../assets/community.png";
import explore from "../../../../assets/explore.png";
import order from "../../../../assets/order.jpg";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Maintain Health Records",
    imageSrc: healthImage,
    linkText: "Read More",
    to: "/patient/medical-history",
  },
  {
    title: "Community Support",
    imageSrc: community,
    linkText: "Explore Communities",
    to: "/community",
  },
  {
    title: "Find A Best Doctor",
    imageSrc: explore,
    linkText: "Explore Doctor",
    to: "/doctors",
  },
  {
    title: "Order Healthcare Products",
    imageSrc: order,
    linkText: "Shop Now",
    to: "/Shop",
  },
];

const KeyFeatures = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full md:h-100 lg:h-120 h-80 overflow-hidden"
    >
      {features.map((feature, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={feature.imageSrc}
            alt={feature.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute p-3 inset-0 bg-black/10 flex flex-col items-baseline justify-end text-center px-6">
            <h2 className="md:text-lg text-sm font-bold text-black drop-shadow-lg mb-4">
              {feature.title}
            </h2>
            <Link
              to={feature.to}
              className="inline-flex items-center px-3 md:py-2 py-1 bg-white/90 text-black font-semibold rounded-lg shadow-lg hover:bg-white transition"
            >
              {feature.linkText}
              
            </Link>
          </div>
        </div>
      ))}


      {/* Dots indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {features.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
