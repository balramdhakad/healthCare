import { FaCalendarCheck, FaClock, FaListOl } from "react-icons/fa";

const HealthSteps = () => (
  <div className="p-6 bg-white rounded-xl shadow-md">
    <h3 className="text-xl font-bold mb-4">Your Journey & Health Steps</h3>
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <FaCalendarCheck />
        </div>
        <div>
          <h4 className="font-semibold">Step 1: Book Appointment</h4>
          <p className="text-sm text-gray-500">
            A checkmark to confirm the appointment is scheduled.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
          <FaListOl />
        </div>
        <div>
          <h4 className="font-semibold">Step 2: Track Token</h4>
          <p className="text-sm text-gray-500">
            A brief guide on how to see their place in a queue.
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
          <FaClock />
        </div>
        <div>
          <h4 className="font-semibold">Step 3: Ready for Consultation</h4>
          <p className="text-sm text-gray-500">
            A notification that their turn is coming up.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default HealthSteps;
