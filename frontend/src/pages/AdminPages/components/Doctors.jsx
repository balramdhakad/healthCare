import React, { useEffect, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import axiosInstance from "../../../utilus/axiosInstance";
import toast from "react-hot-toast";
import Pagination from "./Pagination";
import LoadingBar from "../../../components/LoadingBar";
import { Link } from "react-router-dom"

const Doctors = ({ token }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const limit = 10;

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: limit,
        search: search,
        status: tab === "all" ? "" : tab,
      };

      const res = await axiosInstance.get("/admin/getdoctors", {
        params: params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setDoctors(res.data.doctors || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalResults(res.data.totalResults || 0);
    } catch (err) {
      console.error("Fetch Doctors Error:", err);
      toast.error(err.response?.data?.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, search, tab]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    handleFilterChange(setSearch, e.target.value);
  };

  const handleVerifyToggle = async (id, currentVerifiedStatus) => {
    const newVerifiedStatus = !currentVerifiedStatus;

    try {
      const response = await axiosInstance.put(
        `/admin/doctor/verify/${id}`,
        { verifiedStatus: newVerifiedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(
          `Doctor ${
            newVerifiedStatus ? "verified" : "unverified"
          } successfully.`
        );
        fetchDoctors();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Verification action failed"
      );
    }
  };

  const getTabClasses = (type) =>
    `pb-2 text-sm font-medium transition duration-150 ease-in-out ${
      tab === type
        ? "border-b-2 border-blue-500 text-blue-600"
        : "text-gray-500 hover:text-gray-800"
    }`;

  const getVerificationButtonClasses = (isVerified) =>
    `px-3 py-1 rounded-md text-sm transition ${
      isVerified
        ? "bg-red-100 text-red-600 hover:bg-red-200"
        : "bg-green-100 text-green-600 hover:bg-green-200"
    }`;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>

      <div className="relative mb-6">
        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search doctors (Name, Email, Clinic, Specialization...)"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-lg"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        {["all", "verified", "unverified"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilterChange(setTab, type)}
            className={getTabClasses(type)}
          >
            {type === "verified"
              ? "Verified Doctors"
              : type === "unverified"
              ? "Unverified Doctors"
              : "All Doctors"}
          </button>
        ))}
      </div>

      {loading && (
        <p>

          <LoadingBar />
        </p>
      )}

      {!loading && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 font-semibold border-gray-300 border-b p-4 text-gray-700 ">
            <span>NAME</span>
            <span>EMAIL</span>
            <span>SPECIALIZATION</span>
            <span className="text-right">ACTIONS</span>
          </div>

          {doctors.length > 0 ? (
            doctors.map((doc) => (
              <div
                key={doc._id}
                className="grid grid-cols-4 items-center border-b p-4 border-gray-300 hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-800">
                  Dr. {doc.name}
                </span>
                <span className="text-gray-600 text-sm">{doc.email}</span>
                <span className="text-gray-600 text-sm">
                  {doc.specialization || "N/A"}
                </span>

                <div className="flex justify-end space-x-2">
                  <Link to={`/doctor/${doc._id}`}

                    className="px-3 py-1 border rounded-md text-blue-600 border-blue-300 hover:bg-blue-50 transition text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleVerifyToggle(doc._id, doc.verified)}
                    className={getVerificationButtonClasses(doc.verified)}
                  >
                    {doc.verified ? "Unverify" : "Verify"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6">
              No doctors found matching the filters.
            </p>
          )}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Doctors;
