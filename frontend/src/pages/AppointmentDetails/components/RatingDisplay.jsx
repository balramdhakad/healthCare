import { FaStar } from "react-icons/fa";

const RatingDisplay = ({ rating }) => {
  if (!rating) return null;

  return (
    <div className="mt-10 pt-6 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Feedback</h2>
      <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-300 shadow-inner">
        <div className="flex items-center mb-3">
          <FaStar className="w-6 h-6 text-yellow-500 mr-2" />
          <span className="text-3xl font-extrabold text-yellow-800">
            {rating.rating}
          </span>
          <span className="text-lg text-yellow-600 ml-1">/ 5.0</span>
        </div>
        <p className="text-gray-700 italic border-l-4 border-yellow-400 pl-4">
          "{rating.comment}"
        </p>
      </div>
    </div>
  );
};

export default RatingDisplay;
