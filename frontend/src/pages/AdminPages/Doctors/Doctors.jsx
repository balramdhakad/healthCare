import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../../utilus/axiosInstance";
import toast from "react-hot-toast";
import Pagination from "../components/Pagination";
import LoadingBar from "../../../components/LoadingBar";
import DoctorFilters from "./components/DoctorFilters";
import DoctorTable from "./components/DoctorTable";

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
        limit,
        search,
        status: tab === "all" ? "" : tab,
      };

      const res = await axiosInstance.get("/admin/getdoctors", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setDoctors(res.data.doctors || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalResults(res.data.totalResults || 0);
    } catch (err) {
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
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold py-4 text-gray-900">
        Doctors
      </h1>

  

      <DoctorFilters
        tab={tab}
        search={search}
        onSearchChange={(val) => handleFilterChange(setSearch, val)}
        onTabChange={(val) => handleFilterChange(setTab, val)}
      />

      {loading ? (
        <div className="flex justify-center items-center py-10 text-blue-600">
          <LoadingBar />
        </div>
      ) : (
        <>
          <DoctorTable doctors={doctors} onVerifyToggle={handleVerifyToggle} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Doctors;
