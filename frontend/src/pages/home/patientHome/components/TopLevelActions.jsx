import { FaMapMarkerAlt, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

const ActionCard = ({ title, description, icon, ctaText, to ,state}) => (
  <Link
    to={to}
     state={state}
    className="flex items-start p-6 bg-white rounded-xl shadow-md space-x-4 hover:shadow-lg transition-shadow duration-300"
  >
    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
      {icon}
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-4 text-blue-600 font-medium hover:text-blue-500 cursor-pointer">
        {ctaText}
      </div>
    </div>
  </Link>
);

const TopLevelActions = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ActionCard
      title="Book an In-Person Appointment"
      description="Schedule a visit with your preferred doctor."
      icon={<FaMapMarkerAlt />}
      ctaText="Book Now"
      to="/doctors"
      state={{ appointmentType: "physical" }}
    />
    <ActionCard
      title="Book a Virtual Consultation"
      description="Consult with a doctor from the comfort of your home."
      icon={<FaVideo />}
      ctaText="Book Now"
      to="/doctors"
      state={{ appointmentType: "video" }}
    />
  </div>
);


export default TopLevelActions