import React from "react";
import Section from "./Section";
import RatingBreakdown from "./RatingBreakdown";
import ReviewsList from "./ReviewsList";
import DoctorAvailability from "./DoctorAvailability";

const DoctorMainContent = ({ doctor }) => {
  return (
    <div className="space-y-1">
      {doctor.bio && (
        <Section title="About">
          <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
        </Section>
      )}

      <Section title="Specialization & Education">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-800">Specialization</h4>
            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
              {typeof doctor.specialization === "string"
                ? doctor.specialization
                    .split(",")
                    .map((sp, i) => <li key={i}>{sp.trim()}</li>)
                : [doctor.specialization].map((sp, i) => <li key={i}>{sp}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              Education & Training
            </h4>
            <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
              {doctor.qualifications &&
                doctor.qualifications.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {doctor.reviewsCount > 0 && (
        <Section title="Patient Ratings">
          <RatingBreakdown
            averageRating={doctor.averageRating}
            reviewsCount={doctor.reviewsCount}
            ratingsBreakdown={doctor.ratingsBreakdown}
          />
        </Section>
      )}

      {doctor.recentReviews && doctor.recentReviews.length > 0 && (
        <Section title="Recent Reviews">
          <ReviewsList reviews={doctor.recentReviews} />
        </Section>
      )}


      <DoctorAvailability availability={doctor?.availability} />
    </div>
  );
};

export default DoctorMainContent;
