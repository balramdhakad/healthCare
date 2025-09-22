import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import defaultImage from "../../../../assets/doctor.jpeg"

const DoctorProfileCard = ({ doctor }) => {
    if(!doctor.profilePic){
        doctor.profilePic = defaultImage
    }

  return (
    <Link
      to={`/doctor/${doctor?.doctorId}`}
      className="flex-shrink-0 w-60 p-4 bg-white rounded-xl shadow-md"
    >
      <img
        src={doctor?.profilePic}
        alt={doctor?.name}
        className="w-24 h-24 mx-auto rounded-full object-cover"
      />
      <div className="mt-4 text-center">
        <h4 className="font-semibold text-gray-900">{doctor?.name}</h4>
        <p className="text-sm text-gray-500">{doctor?.specialization}</p>
        <div className="mt-2 flex items-center justify-center text-yellow-400">
          <span className="text-xs mr-1">{doctor?.averageRating}</span>
          <FaStar />
        </div>
      </div>
    </Link>
  );
};

export default DoctorProfileCard;
