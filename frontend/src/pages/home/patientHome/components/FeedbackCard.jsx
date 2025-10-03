import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const FeedbackCard = ({ feedback }) => {
  const stars = [];

  for (let i = 0; i < feedback?.rating.rating; i++) {
    stars.push(<FaStar className="text-yellow-400" />);
  }

  const emptyStars = 5 - feedback?.rating.rating;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar className="text-gray-300" />);
  }

  return (
    <div
      className="flex-shrink-0 w-80 p-6 bg-white rounded-xl shadow-md"
    >
      <div className="flex justify-between items-center">
        <h5 className="font-semibold text-gray-900">
          <div className="flex text-lg">{stars}</div>
        </h5>
        <div className="ml-3">
          <h5 className="font-semibold text-gray-900">{feedback?.patientId.name}</h5>
        </div>
      </div>
      <p className="text-sm text-gray-600 italic mt-2">"{feedback?.rating.comment}"</p>
    </div>
  );
};

export default FeedbackCard;
