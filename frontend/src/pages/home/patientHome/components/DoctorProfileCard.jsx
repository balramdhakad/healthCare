import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import defaultImage from "../../../../assets/doctor.jpeg";

const DoctorProfileCard = ({ doctor }) => {
  if (!doctor.profilePic) {
    doctor.profilePic = defaultImage;
  }

  return (
    <>
      <Link
         to={`/doctor/${doctor?.doctorId}`}
        className="flex-shrink-0 w-60 p-4 border-2 border-blue-200 bg-white rounded-xl shadow-md"
      >
        <img
          src={doctor?.profilePic}
          alt={doctor?.name}
          className="w-full h-40 mx-auto object-cover rounded-1 "
        />
        <div className="mt-4 text-center">
          <h4 className="font-bold text-xl text-gray-900">{doctor?.name}</h4>
          <p className="text-lg font-semibold  text-blue-400">{doctor?.specialization}</p>

          <div className="mt-2 flex items-center justify-center">
            <span className="text-xs font-extrabold mr-1">
              {Number(doctor?.averageRating || 0).toFixed(2)}
            </span>
            {[...Array(Math.round(doctor?.averageRating || 0))].map((_, i) => (
              <FaStar key={i} size={15} className="text-yellow-400" />
            ))}
          </div>


        </div>
      </Link>
    </>
  );
};

export default DoctorProfileCard;
