import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utilus/axiosInstance"; 
import { CgFilters, CgSearch } from "react-icons/cg";
import AppointmentTable from "./components/AppointmentTable";
import AppointmentActionModal from "./components/AppointmentActionModal"; 
import toast from "react-hot-toast";


const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("Today");
    const [isLoading, setIsLoading] = useState(false);
    const [actionRequest, setActionRequest] = useState(null); 

    const statusOptions = ["All", "scheduled", "pending", "completed", "canceled"];
    const { userdata } = useSelector((state) => state.auth);
    const token = userdata?.token;

    const fetchAppointments = useCallback(async () => {
        if (!token) return;
        setIsLoading(true);
        setAppointments([]);

        let endpoint = activeTab === "Today" ? "/doctor/today" : "/doctor/history";
        if (!endpoint) { setIsLoading(false); return; }

        try {
            const response = await axiosInstance.get(endpoint, {
                headers: { Authorization: `Bearer ${token}` },
            });

            let rawAppointments = response.data.data.map((appt) => ({
                ...appt,
                patientName: appt.patientId?.name || "Unknown Patient",
                status: appt.status === "scheduled" && !appt.isApproved ? "pending" : appt.status,
            }));

            const todayString = new Date().toISOString().split("T")[0];
            if (activeTab === "Upcoming") {
                rawAppointments = rawAppointments.filter((appt) => appt.date.split("T")[0] > todayString);
            } else if (activeTab === "History") {
                rawAppointments = rawAppointments.filter((appt) => appt.date.split("T")[0] < todayString);
            }

            setAppointments(rawAppointments);
        } catch (error) {
            toast.error("Failed to fetch appointments.");
        } finally {
            setIsLoading(false);
        }
    }, [activeTab, token]);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const handleActionRequest = (apptId, action) => {
        const appointment = appointments.find(a => (a._id) === apptId);
        if (appointment) {
            setActionRequest({ appointment, action });
        }
    };

    const handleActionSubmit = async (action, id, inputValue) => {
        setActionRequest(null);
        setIsLoading(true);

        try {
            let data = {};
            let url = '';

            if (action === 'Approve') {
                url = `/appointment/${id}/approve`;
                const tokenValue = inputValue && !isNaN(parseInt(inputValue)) ? parseInt(inputValue) : null;
                if (tokenValue) {
                    data = { tokenNo: tokenValue };
                }
            } else if (action === 'Complete') {
                url = `/appointment/${id}`;
                data = { status: 'completed', note: inputValue }; 
            } else if (action === 'Cancel') {
                url = `/appointment/${id}`;
                data = { status: 'canceled', cancelReason: inputValue }; 
            }

            await axiosInstance.put(url, data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            toast.success(`Appointment successfully marked as ${action.toLowerCase()}!`);
            fetchAppointments(); 

        } catch (error) {
            toast.error(`Error ${action}: ${error.response?.data?.message || "Server error"}`);
            setIsLoading(false);
        }
    };

    const filteredAndSortedAppointments = useMemo(() => {
        return appointments
            .filter((appt) => filterStatus === "All" || appt.status === filterStatus)
            .filter(
                (appt) =>
                    appt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    appt.reasonForVisit?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (a.date !== b.date) return a.date.localeCompare(b.date);
                return a.time.localeCompare(b.time);
            });
    }, [appointments, filterStatus, searchTerm]);

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8">

                <h1 className="text-3xl font-extrabold text-teal-800 mb-2">Appointments Dashboard</h1>
                <p className="text-gray-600 mb-6 border-b pb-4">Manage your schedule, track patient requests, and review history.</p>

                <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                    {["Today", "Upcoming", "History"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setFilterStatus("All"); setSearchTerm(""); }}
                            className={`py-2 px-6 text-lg font-semibold whitespace-nowrap transition-colors duration-200 ${activeTab === tab ? "border-b-4 border-teal-600 text-teal-700" : "text-gray-500 hover:text-teal-600"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
                    <div className="relative flex items-center w-full md:w-56">
                        <CgFilters className="text-gray-500 absolute left-3" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white w-full focus:border-teal-500 focus:ring-teal-500"
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status === "scheduled" ? "Scheduled (Approved)" : `Status: ${status}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="relative flex-grow">
                        <CgSearch className="text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by patient name or reason..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:border-teal-500 focus:ring-teal-500"
                        />
                    </div>
                </div>


                <AppointmentTable
                    appointments={filteredAndSortedAppointments}
                    isLoading={isLoading}
                    onActionRequest={handleActionRequest} 
                />
            </div>

            {actionRequest && (
                <AppointmentActionModal
                    action={actionRequest.action}
                    appointment={actionRequest.appointment}
                    onSubmit={handleActionSubmit}
                    onClose={() => setActionRequest(null)}
                />
            )}


        </div>
    );
};

export default DoctorAppointments;