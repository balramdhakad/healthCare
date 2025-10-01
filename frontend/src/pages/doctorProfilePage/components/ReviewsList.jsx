import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewsList = ({ reviews }) => {
  return (
    <div className="space-y-6">
      {reviews.map((review, idx) => (
        <div key={idx} className="border-b pb-4 last:border-none">
          <div className="flex justify-between items-center">
            <div className="text-gray-800 font-semibold">{review.patientName}</div>
            <div className="flex items-center space-x-1 text-yellow-500">
              {[...Array(review.rating)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
          {review.comment && <p className="text-gray-700 mt-2">{review.comment}</p>}
          {review.ratedAt && (
            <p className="text-xs text-gray-500 mt-1">
              {new Date(review.ratedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
