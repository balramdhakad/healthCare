import { FaRegTrashAlt } from "react-icons/fa";

const QualificationField = ({ value, onChange, onRemove, index }) => (
  <div className="flex items-center space-x-2 mb-2">
    
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="e.g., MD, Cardiology"
      required
    />
    <button
      type="button"
      onClick={() => onRemove(index)}
      className="text-gray-500 hover:text-red-600"
    >
     <FaRegTrashAlt />
    </button>
  </div>
);

export default QualificationField