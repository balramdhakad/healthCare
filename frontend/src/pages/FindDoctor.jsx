
import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaFilter, FaSort, FaUserClock, FaRupeeSign } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import defaultImage from '../assets/doctor.jpeg';
import axiosInstance from '../utilus/axiosInstance';
import DoctorCard from './DoctorCategory/components/DoctorCard';
import { FaUserDoctor } from "react-icons/fa6";
import DoctorCategoryGrid from './home/patientHome/components/DoctorCategoryGrid';

const DoctorCategoryCard = ({ title, onClick }) => (
  <div
    onClick={() => onClick(title)}
    className="flex flex-col items-center justify-center p-2 bg-white rounded-xl shadow hover:shadow-md cursor-pointer transition"
  >
    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xl mb-2">
      <FaUserDoctor />
    </div>
    <p className="text-md font-semibold text-gray-700">{title}</p>
  </div>
);

const FindDoctor = () => {
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [appointmentTypeFilter, setAppointmentTypeFilter] = useState(
    location?.state?.appointmentType || ''
  );
  const [sortBy, setSortBy] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Gynecologist",
    "Pediatrician",
    "Orthopedist",
    "Neurologist",
    "Ophthalmologist",
    "ENT Specialist",
  ];

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (specializationFilter) params.specialization = specializationFilter;


      if (appointmentTypeFilter) {
        params.appointmentTypes = appointmentTypeFilter;
      }

      const res = await axiosInstance.get('/general/doctors', { params });

      let sortedDoctors = [...res.data.data];

      if (sortBy === 'experience-desc') {
        sortedDoctors.sort((a, b) => b.experience - a.experience);
      } else if (sortBy === 'fees-asc') {
        sortedDoctors.sort((a, b) => a.fees - b.fees);
      }

      setDoctors(sortedDoctors);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch doctors. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, specializationFilter, appointmentTypeFilter, sortBy]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchDoctors();
    }, 500);

    return () => clearTimeout(timeout);
  }, [fetchDoctors]);

  return (
    <div className="container mx-auto px-4 md:px-8">

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <div className="relative w-full max-w-4xl">
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors, category, services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
        <div className="relative">
          <FaFilter className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700"
          >
            <option value="">All Specializations</option>
            
            {specializations
            .map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>


        <div className="relative">
          <FaFilter className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
          <select
            value={appointmentTypeFilter}
            onChange={(e) => setAppointmentTypeFilter(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700"
          >
            <option value="">All Appointment Types</option>
            <option value="physical">Physical</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div className="relative">
          <FaSort className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white text-gray-700"
          >
            <option value="">Sort by</option>
            <option value="experience-desc">Experience (High to Low)</option>
            <option value="fees-asc">Fees (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Browse by Category  */}
      {searchTerm.trim() === '' && (
        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {specializations.map((title, index) => (
              <DoctorCategoryCard
                key={index}
                title={title}
                onClick={(spec) => setSpecializationFilter(spec)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Doctors List */}
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          {searchTerm || specializationFilter || appointmentTypeFilter ? 'Search Results' : 'All Doctors'}
        </h2>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            <p>Loading doctors...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map(doctor => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No doctors found. Try different keywords or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctor;
