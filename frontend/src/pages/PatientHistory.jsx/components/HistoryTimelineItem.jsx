import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaClock, FaHeart, FaLungs, FaBrain, FaCalendarAlt, FaUserMd, FaTrash, FaEdit } from "react-icons/fa";
import FormatDate from "../../../components/FormateDate";
import axiosInstance from "../../../utilus/axiosInstance";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const getConditionIcon = (condition) => {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('diabetes') || lowerCaseCondition.includes('cholesterol') || lowerCaseCondition.includes('hypertension')) {
        return <FaHeart className="w-5 h-5 text-red-500" />;
    }
    if (lowerCaseCondition.includes('asthma') || lowerCaseCondition.includes('lung')) {
        return <FaLungs className="w-5 h-5 text-blue-500" />;
    }
    if (lowerCaseCondition.includes('migraine') || lowerCaseCondition.includes('headache')) {
        return <FaBrain className="w-5 h-5 text-purple-500" />;
    }
    if (lowerCaseCondition.includes('back pain') || lowerCaseCondition.includes('injury')) {
        return <FaClock className="w-5 h-5 text-gray-500" />;
    }

    return <FaCalendarAlt className="w-5 h-5 text-gray-500" />;
};

const HistoryTimelineItem = ({ record, onDelete, onEdit }) => {
    const [showImageModal, setShowImageModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const {userdata} = useSelector((state)=>state.auth)
    const token = userdata?.token

    let operationType = "edit"



    console.log(`/patient/medical-history/${record._id}`)
    const handleImageClick = () => {
        setShowImageModal(true);
    };

    const handleCloseModal = () => {
        setShowImageModal(false);
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;

        try {
            setLoading(true);
            await axiosInstance.delete(`/patient/medical-history/${record._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (onDelete) onDelete(record._id);
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("Failed to delete the record.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative mb-8 pl-12">
            {/* Timeline dot and line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-teal-500 rounded-full z-10"></div>
            <div className="absolute left-[7px] h-full w-[2px] bg-gray-200 top-0"></div>

            <p className="text-sm font-semibold text-gray-600 mb-2">{FormatDate(record.diagnosisDate)}</p>

            <div className="p-5 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition duration-200">

                {/* Icon and Condition */}
                <div className="flex items-center space-x-3 mb-3">
                    {getConditionIcon(record?.condition)}
                    <h3 className="text-xl font-bold text-gray-800">{record.condition}</h3>
                </div>

                {/* Thumbnail Image */}
                {record.image && (
                    <div className="mb-3 cursor-pointer w-24" onClick={handleImageClick}>
                        <img
                            src={record.image}
                            alt={`Related to ${record.condition}`}
                            className="w-full h-auto rounded-md border border-gray-100 shadow-sm hover:opacity-80 transition"
                        />
                        <p className="text-xs text-gray-500 mt-1 text-center">Click to view</p>
                    </div>
                )}

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-700">
                    <p className="flex items-center space-x-2">
                        <FaUserMd className="w-4 h-4 text-teal-500" />
                        <span>Diagnosed by: <span className="font-semibold">{record.doctorName || 'N/A'}</span></span>
                    </p>
                    <p className="pl-6">
                        <span className="font-semibold">Treatment:</span> {record.treatment}
                    </p>
                    <p className="pl-6 pt-2 border-t border-gray-100 mt-2">
                        <span className="font-semibold">Notes:</span> {record.notes}
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-3">
                    <Link to={`/patient/medical-history/add/${record._id}`} state={operationType}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                        <FaEdit /> Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                    >
                        <FaTrash /> {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>

            {/* Fullscreen Image Modal */}
            {showImageModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={handleCloseModal}
                >
                    <img
                        src={record.image}
                        alt="Full view"
                        className="max-w-full max-h-full rounded-md shadow-lg"
                    />
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-4 right-4 text-white text-xl font-bold bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-1"
                    >
                        <MdCancel />
                    </button>
                </div>
            )}
        </div>
    );
};

export default HistoryTimelineItem;
