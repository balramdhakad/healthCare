import { MdArrowDropDown } from "react-icons/md";

const AvailabilityRow = ({ day, time, onEdit }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100">
    <span className="w-28 font-medium">{day}</span>
    <span className="text-gray-600 flex-grow">
      {time === "Closed" ? "Not available" : time}
    </span>
    <button
      type="button"
      onClick={() => onEdit(day)}
      className="text-sm text-teal-600 hover:text-teal-800 flex items-center"
    >
      Edit
      <MdArrowDropDown />
    </button>
  </div>
);

export default AvailabilityRow
