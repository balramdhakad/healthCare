
import healthImage from "../../../../assets/health.png";
import community from "../../../../assets/community.png"
import rating from "../../../../assets/rating.jpg"
import order from "../../../../assets/order.jpg"
import { Link } from "react-router-dom";

const FeatureCard = ({ title, imageSrc, linkText, to }) => {
  return (
    <Link
      to={to}
      className="relative block rounded-xl shadow-md h-48 sm:h-64 group overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
    >
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{title}</h3>
        <div className="flex items-center text-sm font-semibold text-white drop-shadow-lg">
          {linkText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};
const KeyFeatures = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <FeatureCard
      title="Maintain Health Records"
      imageSrc={healthImage}
      linkText="Read More"
      to="/health-records"
    />
    <FeatureCard
      title="Community Support"
      imageSrc={community}
      linkText="Explore Communities"
      to="/community"
    />
    <FeatureCard
      title="Only Authentic Ratings"
      imageSrc={rating}
      linkText="View Ratings"
      to="/ratings"
    />
    <FeatureCard
      title="Order Healthcare Products"
      imageSrc={order}
      linkText="Shop Now"
      to="/shop"
    />
  </div>
);


export default KeyFeatures;