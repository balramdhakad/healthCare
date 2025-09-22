import LoadingBar from "../../../components/LoadingBar";
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors, loading, error }) => {
  if (loading) {
    return <LoadingBar />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg py-12">{error}</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))
      ) : (
        <div className="md:col-span-2 text-center p-8 bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-500">
            No doctors found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorList