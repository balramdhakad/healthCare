import { FaEdit, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const formatAvailability = (availability) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const slots = {};
  days.forEach((day) => {
    slots[day] = availability
      ?.filter((a) => a.day === day)
      .map(
        (a) =>
          `${a.startTime.replace(/:\d{2}\s(AM|PM)$/, "")} - ${a.endTime.replace(
            /:\d{2}\s(AM|PM)$/,
            ""
          )}`
      );
  });
  return slots;
};

const ProfileCardUI = ({ profile }) => {
  const operationType = "update";
  const formattedAvailability = formatAvailability(profile.availability);
  const appointmentTypes = profile.appointmentTypes || [];

  return (
    <div className="max-w-4xl mx-auto shadow-xl rounded-2xl overflow-hidden my-10 border border-gray-100">
      <div className="p-8 flex items-start justify-between bg-teal-50/50">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full mr-6 bg-gray-300 overflow-hidden border-4 border-white shadow-md">
            <img
              src={profile?.profilePic}
              alt={`Dr. ${profile.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-teal-800">
              Dr. {profile.name}
            </h1>
            <p className="text-xl text-gray-600">{profile.specialization}</p>
            <p className="text-gray-500 flex items-center mt-1">
              <FaPhoneAlt />
              +91 {profile.mobileNo || ""}
            </p>
          </div>
        </div>

        <Link to={"/profile/edit"}  state={operationType}>
          <button className="flex items-center space-x-2 px-4 py-2 mt-2 text-sm font-medium text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 transition duration-150">
            <FaEdit />

            <span>Edit Profile</span>
          </button>
        </Link>
      </div>

      <div className="p-8">
        {/* Bio Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-1 mb-2">
            Bio
          </h2>
          <p className="text-gray-700">{profile.bio}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Specialization & Experience */}
          <div>
            <h3 className="text-md font-semibold text-gray-600">
              Specialization
            </h3>
            <p className="text-lg text-gray-800">{profile.specialization}</p>
          </div>
          <div>
            <h3 className="text-md font-semibold text-gray-600">Experience</h3>
            <p className="text-lg text-gray-800">{profile.experience} years</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Qualifications */}
          <div>
            <h3 className="text-md font-semibold text-gray-600">
              Qualifications
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              {profile.qualifications.map((q, index) => (
                <li key={index} className="text-sm">
                  {q}
                </li>
              ))}
            </ul>
          </div>
          {/* Fees and Appointment Types */}
          <div>
            <h3 className="text-md font-semibold text-gray-600">
              Consultation Fees
            </h3>
            <p className="text-lg font-bold text-teal-700 mb-3">
              ₹{profile.fees}
            </p>
            <div className="flex space-x-2">
              {appointmentTypes.includes("physical") && (
                <span className="p-1 px-3 border border-teal-500 text-teal-500 rounded-full text-xs font-medium bg-teal-50">
                  Physical
                </span>
              )}
              {appointmentTypes.includes("video") && (
                <span className="p-1 px-3 border border-teal-500 text-teal-500 rounded-full text-xs font-medium bg-teal-50">
                  Video
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Clinic Address */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-1 mb-2">
            Clinic Address
          </h2>
          <p className="text-gray-700">{profile.clinicAddress}</p>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-1 mb-4">
            Availability
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(formattedAvailability).map(
              ([day, slots], index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    slots.length > 0
                      ? "bg-teal-50 border border-teal-200"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <p className="font-semibold text-sm mb-1">{day}</p>
                  {slots.length > 0 ? (
                    slots.map((slot, i) => (
                      <p key={i} className="text-xs">
                        {slot}
                      </p>
                    ))
                  ) : (
                    <p className="text-xs">Unavailable</p>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardUI;
