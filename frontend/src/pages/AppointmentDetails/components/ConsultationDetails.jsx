const ConsultationDetails = ({ reasonForVisit, note, isCompleted }) => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Consultation Reason
        </h3>
        <p className="text-gray-600 italic">{reasonForVisit || "N/A"}</p>
      </div>

      {isCompleted && note && (
        <div className="p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Doctor's note
          </h3>
          <p className="text-gray-600">{note}</p>
        </div>
      )}
    </div>
  );
};

export default ConsultationDetails;
