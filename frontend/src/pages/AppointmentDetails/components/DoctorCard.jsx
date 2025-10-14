import { Link } from "react-router-dom";
import { CgUser } from "react-icons/cg";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-md text-center">
      <img
        src={doctor?.profilePic || "/default-doctor.jpg"}
        alt={`Dr. ${doctor?.name || "Doctor"}`}
        className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-white shadow-lg"
      />
      <h3 className="text-xl font-bold text-blue-800">
        {doctor?.name || "N/A"}
      </h3>
      <p className="text-sm text-blue-600 mb-2">
        {doctor?.specialization || "N/A"}
      </p>
      <Link
        to={`/doctor/${doctor?._id}`}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        <CgUser className="w-4 h-4 mr-2" /> View Profile
      </Link>
  
    </div>
  );
};

export default DoctorCard;
