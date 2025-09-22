import React from 'react';
import { FaStar } from 'react-icons/fa';
import Section from './Section';

const DoctorMainContent = ({ doctor }) => (
  <div className="lg:w-2/3 space-y-8">
    {/* About Section */}
    {doctor.bio && (
      <Section title="About">
        <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
      </Section>
    )}

    {/* Specialization  */}
    <Section title="Specialization & Education">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        <div>
          <h4 className="font-semibold text-gray-800">Specialization</h4>
          <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
            {doctor?.specialization}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Education & Training</h4>
          <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
            {doctor.qualifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>

    {/* Patient Ratings Section */}
    {doctor.reviewsCount > 0 && (
      <Section title="Patient Ratings">
        <div className="flex items-end gap-6">
          <div className="text-6xl font-bold text-gray-900">
            {doctor.averageRating ? doctor.averageRating.toFixed(1) : 'N/A'}
          </div>
          <div className="flex-grow space-y-2">
            {Object.entries(doctor.ratingsBreakdown).sort(([a], [b]) => b - a).map(([stars, count], index) => {
              const total = doctor.reviewsCount;
              const percentage = total > 0 ? (count / total) * 100 : 0;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-8 flex-shrink-0 text-gray-500">{stars} <FaStar className="inline text-sm" /></div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-600 ml-2">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Based on {doctor.reviewsCount} reviews</p>
      </Section>
    )}

    {/* Recent Reviews Section */}
    {doctor.recentReviews && doctor.recentReviews.length > 0 && (
      <Section title="Recent Reviews">
        <div className="space-y-4">
          {doctor.recentReviews.map((review, index) => (
            review && review.text && (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="flex items-center ml-auto text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{review.text}</p>
              </div>
            )
          ))}
        </div>
      </Section>
    )}
  </div>
);

export default DoctorMainContent;