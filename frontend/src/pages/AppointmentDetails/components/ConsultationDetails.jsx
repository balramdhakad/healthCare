const ConsultationDetails = ({ reasonForVisit, notes, isCompleted }) => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Consultation Reason
        </h3>
        <p className="text-gray-600 italic">{reasonForVisit || "N/A"}</p>
      </div>

      {isCompleted && notes && (
        <div className="p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Doctor's Notes
          </h3>
          <p className="text-gray-600">{notes}</p>
        </div>
      )}
    </div>
  );
};

export default ConsultationDetails;
