import React from "react";
import { FaStar } from "react-icons/fa";

const RatingBreakdown = ({ averageRating, reviewsCount, ratingsBreakdown }) => {
  const avg = averageRating || 0;
  const displayAvg = avg.toFixed(2);
  const fullStars = Math.floor(avg);
  const halfStar = avg - fullStars >= 0.5;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="text-5xl font-bold text-gray-900">{displayAvg}</div>
        <div className="flex items-center">
          {[...Array(fullStars)].map((_, i) => (
            <FaStar key={`star-full-${i}`} className="text-yellow-400" />
          ))}
          {halfStar && <FaStar className="text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />}
          {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
            <FaStar key={`star-empty-${i}`} className="text-gray-300" />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(ratingsBreakdown)
          .sort((a, b) => Number(b[0]) - Number(a[0]))
          .map(([stars, count]) => {
            const percent = reviewsCount > 0 ? (count / reviewsCount) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-2">
                <div className="w-8 text-gray-600">
                  {stars} <FaStar className="inline text-sm text-yellow-500" />
                </div>
                <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="w-10 text-right text-gray-600">{count}</div>
              </div>
            );
          })}
      </div>

      <div className="text-sm text-gray-500">
        Based on {reviewsCount} review{reviewsCount > 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default RatingBreakdown;
