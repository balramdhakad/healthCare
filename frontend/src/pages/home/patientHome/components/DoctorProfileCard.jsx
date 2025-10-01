import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import defaultImage from "../../../../assets/doctor.jpeg";

const DoctorProfileCard = ({ doctor }) => {
  if (!doctor.profilePic) {
    doctor.profilePic = defaultImage;
  }

  return (
    <>
      <div
        // to={`/doctor/${doctor?.doctorId}`}
        className="flex-shrink-0 w-60 p-4 border-2 border-black bg-white rounded-xl shadow-md"
      >
        <img
          src={doctor?.profilePic}
          alt={doctor?.name}
          className="w-26 h-30 mx-auto rounded-full object-cover"
        />
        <div className="mt-4 text-center">
          <h4 className="font-bold text-xl text-gray-900">{doctor?.name}</h4>
          <p className="text-sm text-gray-800">{doctor?.specialization}</p>

          <div className="mt-2 flex items-center justify-center">
            <span className="text-xs font-extrabold mr-1">
              {Number(doctor?.averageRating || 0).toFixed(2)}
            </span>
            {[...Array(Math.round(doctor?.averageRating || 0))].map((_, i) => (
              <FaStar key={i} size={15} className="text-yellow-400" />
            ))}
          </div>

          <Link to={`/doctor/${doctor.doctorId}`}>
            <button className="px-8 font-bold py-2 rounded-md mt-3 bg-blue-800 text-center text-white">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DoctorProfileCard;
