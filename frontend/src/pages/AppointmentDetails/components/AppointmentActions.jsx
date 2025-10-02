const AppointmentActions = ({
  isScheduled,
  isCompleted,
  hasRating,
  onRate,
  doctor,
  role,
  onCancel,
  hasNote,
}) => {
  return (
    <div className="space-y-3 pt-2">
      {isScheduled && (
        <button
          onClick={onCancel}
          className="w-full px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Cancel Appointment
        </button>
      )}

      {role === "patient" ? (
        <>
          {isCompleted && !hasRating && (
            <button
              // onClick={onRate}
              className="w-full px-4 py-2 text-sm font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50"
            >
              Submit Rating
            </button>
          )}
        </>
      ) : (
        <>
          {isCompleted && !hasNote && (
            <button
              onClick={onRate}
              className="w-full px-4 py-2 text-sm font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50"
            >
              Add Note
            </button>
          )}
        </>
      )}

      <div className="text-sm font-medium text-gray-500 pt-2 border-t mt-4">
        <span className="block mb-1">Total Fee:</span>
        <span className="text-lg font-bold text-gray-800">
          ₹{doctor?.fees?.toFixed(2) || "0.00"}
        </span>
      </div>
    </div>
  );
};

export default AppointmentActions;
