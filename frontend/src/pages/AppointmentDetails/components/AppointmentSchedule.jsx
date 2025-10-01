import { CgCalendar } from "react-icons/cg";
import { FaClock } from "react-icons/fa";
import FormatDate from "../../../components/FormateDate";

const AppointmentSchedule = ({ date, time, tokenNo }) => {
  return (
    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-inner">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
        Schedule
      </h3>
      <div className="space-y-3 text-gray-700">
        <div className="flex items-center space-x-3">
          <CgCalendar className="w-5 h-5 text-indigo-500" />
          <span className="font-medium">Date:</span>
          <span className="font-bold">{FormatDate(date)}</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaClock className="w-5 h-5 text-indigo-500" />
          <span className="font-medium">Time:</span>
          <span className="font-bold">{time || "N/A"}</span>
        </div>
        {tokenNo && (
          <div className="flex items-center space-x-3">
            <span className="font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm">
              Token No:
            </span>
            <span className="font-bold">{tokenNo}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentSchedule;
