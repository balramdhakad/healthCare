import { useParams } from "react-router-dom";
import DoctorList from "./components/DoctorList";
import { useEffect, useState } from "react";
import axiosInstance from "../../utilus/axiosInstance";
import FilterBar from "./components/FilterBar";

const DoctorCategoryPage = () => {
  const { specialization } = useParams();
  console.log(specialization);
  const [doctors, setDoctors] = useState([]);
  const [alldoctors, setallDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointmentTypeFilter, setAppointmentTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("experience");
  console.log(doctors)

  const getFilteredAndSortedDoctors = (allDocs, typeFilter, sortType) => {
    let filtered = alldoctors;


    if (typeFilter !== "all") {
      filtered = alldoctors.filter((doc) =>
        doc.appointmentTypes?.includes(typeFilter)
      );
    }
    if (typeFilter === "all") {
      filtered = alldoctors
    }

    let sorted = [...filtered].sort((a, b) => {
      if (sortType === "experience") {
        return b.experience - a.experience;
      }
      if (sortType === "fees") {
        return a.fees - b.fees;
      }
      return 0;
    });

    return sorted;
  };

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/general/doctors?specialization=${specialization}`
      );
      const data = await response.data;
      const processedDoctors = data.data.map((doc) => ({ ...doc }));
      setDoctors(processedDoctors);
      setallDoctors(processedDoctors)
    } catch (err) {
      setError("Failed to fetch doctors. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [specialization]);

  useEffect(() => {
    if (doctors.length > 0) {
      const filteredAndSorted = getFilteredAndSortedDoctors(
        doctors,
        appointmentTypeFilter,
        sortBy
      );
      setDoctors(filteredAndSorted);
    }
  }, [appointmentTypeFilter, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 capitalize text-center">
          {specialization || "Doctors"}
        </h1>
        <FilterBar
          appointmentTypeFilter={appointmentTypeFilter}
          setAppointmentTypeFilter={setAppointmentTypeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <DoctorList doctors={doctors} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default DoctorCategoryPage;
