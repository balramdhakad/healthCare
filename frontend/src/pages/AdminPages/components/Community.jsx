import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaPlus } from "react-icons/fa";
import LoadingBar from "../../../components/LoadingBar";
import axiosInstance from "../../../utilus/axiosInstance";
import CommunityTable from "./CommunityTable";
import Pagination from "./Pagination";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const Community = ({ token }) => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterSearch, setFilterSearch] = useState("");

  const fetchCommunities = useCallback(
    async (page = 1, search = filterSearch) => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get("/admin/communities", {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, limit: 10, search },
        });

        if (res.data.success) {
          setCommunities(res.data.communities);
          setCurrentPage(res.data.page);
          setTotalPages(res.data.totalPages);
        } else {
          setError(res.data.message || "Failed to fetch communities.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    },
    [token, filterSearch]
  );

  useEffect(() => {
    fetchCommunities(1);
  }, [filterSearch, fetchCommunities]);

  const debouncedSearch = useCallback(
    debounce((val) => setFilterSearch(val), 500),
    []
  );

  const handleDelete = async (community) => {
    if (!window.confirm(`Delete community "${community.name}"?`)) return;
    try {
      await axiosInstance.delete(`/admin/communities/${community._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Community deleted");
      fetchCommunities(currentPage);
    } catch (err) {
      toast.error("Failed to delete community");
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      fetchCommunities(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Communities</h1>
        <button
          onClick={() => console.log("Open Create Community")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" /> Create Community
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search communities..."
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {loading ? (
          <LoadingBar />
        ) : (
          <>
            <CommunityTable communities={communities} onDelete={handleDelete} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      {error && <p className="text-center text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Community;
