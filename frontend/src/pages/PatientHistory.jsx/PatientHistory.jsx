import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axiosInstance from "../../utilus/axiosInstance";
import LoadingBar from "../../components/LoadingBar";
import HistoryTimelineItem from "./components/HistoryTimelineItem";

const PatientHistory = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let p;

  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;

  const fetchHistory = useCallback(async () => {
    if (!token) {
      setError("Authentication token missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/patient/medical-history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(response.data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch medical history.");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Health History</h1>
        <Link to={`/patient/medical-history/add`}>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 shadow-md">
            <FaPlus className="w-3 h-3" />
            <span>Add Medical History</span>
          </button>
        </Link>
      </div>

      {error && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-300 rounded-lg">
          {error}
        </div>
      )}
      <div className="relative">
        {history.length > 0 ? (
          history?.map((record) => (
            <HistoryTimelineItem
              key={record._id}
              onDelete={(id) => setHistory(history.filter((r) => r._id !== id))}
              record={record}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
            <p>No medical history records found.</p>
            <Link to={"/patient/medical-history/add"} className="mt-2 text-sm">
              Click 'Add Medical History' to start your record.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientHistory;
