import { FaBone, FaBrain, FaEye, FaHeartbeat, FaTooth, FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";


const CategoryCard = ({ icon, title, to }) => (
  <Link
    to={to}
    className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
      {icon}
    </div>
    <h4 className="mt-2 text-sm font-medium text-gray-700">{title}</h4>
  </Link>
);

const DoctorCategoryGrid = () => (
  <div>
    <SectionTitle title="Find a Doctor by Category" />
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">


      <CategoryCard
        icon={<FaUserMd />}
        title="General Physician"
        to="/doctor/category/general-physician"
      />
      <CategoryCard
        icon={<FaHeartbeat />}
        title="Cardiologist"
        to="/doctor/category/cardiologist"
      />
      <CategoryCard
        icon={<FaBrain />}
        title="Neurologist"
        to="/doctor/category/neurologist"
      />
      <CategoryCard
        icon={<FaBone />}
        title="Orthopedist"
        to="/doctor/category/orthopedist"
      />
      <CategoryCard
        icon={<FaTooth />}
        title="Dentist"
        to="/doctor/category/categorydentist"
      />
      <CategoryCard
        icon={<FaEye />}
        title="Ophthalmologist"
        to="/doctor/category/ophthalmologist"
      />
    </div>
  </div>
);

export default DoctorCategoryGrid;
