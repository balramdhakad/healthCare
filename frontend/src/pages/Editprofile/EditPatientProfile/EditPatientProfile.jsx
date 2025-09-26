import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaUpload, FaCalendarAlt, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import axiosInstance from "../../../utilus/axiosInstance";
import LoadingBar from "../../../components/LoadingBar";

const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    return date.toISOString().split('T')[0];
};

const EditPatientProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const operationType = location.state
    console.log(operationType)

    const [formData, setFormData] = useState({
        name: "",
        mobileNo: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        address: "",
    });
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [currentProfilePicUrl, setCurrentProfilePicUrl] = useState("");
    const [loading, setLoading] = useState(operationType === "update");
    const [submitting, setSubmitting] = useState(false);

    const { userdata } = useSelector((state) => state.auth);
    const token = userdata?.token;
    const user = userdata?.user;

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            name: user?.name || prev.name,
            mobileNo: user?.mobileNo || prev.mobileNo,
            email: user?.email || prev.email,
        }));
    }, [user]);

    const fetchProfile = useCallback(async () => {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const res = await axiosInstance.get("/patient/getprofile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const profileData = res.data.data.patientProfile;
            console.log(profileData);
            

            setFormData({
                name: profileData.name || user?.name || "",
                mobileNo: profileData.mobileNo || user?.mobileNo || "",
                email: profileData.email || "",
                dateOfBirth: formatDateForInput(profileData.dateOfBirth),
                gender: profileData.gender || "",
                bloodGroup: profileData.bloodGroup || "",
                address: profileData.address || "",
            });
            setCurrentProfilePicUrl(profileData.profilePic || "");
        } catch (error) {
            console.error("Fetch profile error:", error);

        } finally {
            setLoading(false);
        }
    }, [token, user]);

    useEffect(() => {
        if (operationType === "update") {
            fetchProfile();
        } else if (operationType === "create") {
            setLoading(false);
        }
    }, [operationType, fetchProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setProfilePicFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formPayload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            formPayload.append(key, value || ""); 
        });

        if (profilePicFile) {
            formPayload.append("profilePic", profilePicFile);
        }

        const method = operationType === "update" ? "put" : "post";
        const url = operationType === "update" ? "/patient/updatePatientProfile" : "/patient/createPatientProfile";

        try {
            const res = await axiosInstance[method](url, formPayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            window.alert(res.data.message);
            navigate("/profile");
        } catch (error) {
            window.alert("server error");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return(<LoadingBar/>)
    }

    return (
        <div className="max-w-xl mx-auto p-6 my-10 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-semibold text-gray-800">
                {operationType === "update" ? "Edit Patient Profile" : "Create Patient Profile"}
            </h1>
            <p className="text-gray-500 mb-6 text-sm">Update patient's personal information and profile picture below.</p>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                
                {/* Profile Picture Section */}
                <div className="flex items-center space-x-6 mb-8 border-b pb-6">
                    <img 
                        src={profilePicFile ? URL.createObjectURL(profilePicFile) : currentProfilePicUrl || "path/to/default/avatar.jpg"} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                        <p className="font-semibold text-gray-800">Profile Picture</p>
                        <p className="text-xs text-gray-500 mb-2">Recommended size: 200x200px, JPG or PNG format.</p>
                        <input type="file" id="profilePicInput" onChange={handleFileChange} className="hidden" accept="image/*" />
                        <label 
                            htmlFor="profilePicInput" 
                            className="flex items-center justify-center space-x-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 w-fit"
                        >
                            <FaUpload className="w-3 h-3"/>
                            <span>Upload</span>
                        </label>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                        <div className="relative">
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg pr-10" required />
                            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                        <div className="relative">
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg pr-10" required />
                            <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    {/* Mobile Number*/}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Mobile Number</label>
                        <div className="relative">
                            <input type="tel" name="mobileNo" value={formData.mobileNo} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 pr-10" readOnly />
                            <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <FaLock className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3"/>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Contact support to change your mobile number.</p>
                    </div>
                    {/* Date of Birth */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Date of Birth</label>
                        <div className="relative">
                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg pr-10" />
                            <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    
                    {/* Blood Group */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Blood Group</label>
                        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white">
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="123 Main St" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                    <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="px-6 py-2 text-white bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400">
                        {submitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPatientProfile;