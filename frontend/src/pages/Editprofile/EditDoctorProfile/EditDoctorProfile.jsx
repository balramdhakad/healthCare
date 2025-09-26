import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utilus/axiosInstance";
import AvailabilityEditorModal from "./components/AvailabilityEditorModal";
import { FaPlus } from "react-icons/fa";
import AvailabilityRow from "./components/AvailabilityRow";
import QualificationField from "./components/QualificationField";
import LoadingBar from "../../../components/LoadingBar";

const EditDoctorProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const operationType = location.state;

  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    email: "",
    bio: "",
    specialization: "",
    experience: "",
    qualifications: [""],
    clinicAddress: "",
    fees: "",
    appointmentTypes: ["physical"],
    availability: [],
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [currentProfilePicUrl, setCurrentProfilePicUrl] = useState("");
  const [loading, setLoading] = useState(operationType === "update");

  const { userdata } = useSelector((state) => state.auth);
  let token = userdata?.token;
  let user = userdata?.user;

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: user?.name || prev.name,
      mobileNo: user?.mobileNo || prev.mobileNo,
    }));
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/doctor/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = res.data.data;

      setFormData({
        name: profileData.name || user?.name || "",
        mobileNo: profileData.mobileNo || user?.mobileNo || "",
        email: profileData.email || "",
        bio: profileData.bio || "",
        specialization: profileData.specialization || "",
        experience: profileData.experience || "",
        qualifications:
          profileData.qualifications.length > 0
            ? profileData.qualifications
            : [""],
        clinicAddress: profileData.clinicAddress || "",
        fees: profileData.fees || "",
        appointmentTypes: profileData.appointmentTypes || ["physical"],
        availability: profileData.availability || [],
      });
      setCurrentProfilePicUrl(profileData.profilePic || "");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (operationType === "update" && token) {
      fetchProfile();
    } else if (operationType === "create") {
      setLoading(false);
    }
  }, [operationType, token, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedTypes = checked
          ? [...prev.appointmentTypes, value]
          : prev.appointmentTypes.filter((t) => t !== value);
        return { ...prev, appointmentTypes: updatedTypes };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setProfilePicFile(e.target.files[0]);
  };

  const handleQualificationChange = (index, value) => {
    const newQuals = [...formData.qualifications];
    newQuals[index] = value;
    setFormData((prev) => ({ ...prev, qualifications: newQuals }));
  };

  const handleAddQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, ""],
    }));
  };

  const handleRemoveQualification = (index) => {
    const newQuals = formData.qualifications.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      qualifications: newQuals.length > 0 ? newQuals : [""],
    }));
  };

  const handleEditAvailability = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const handleSaveAvailability = (day, newSlots) => {
    setFormData((prev) => {
      const filteredAvailability = prev.availability.filter(
        (slot) => slot.day !== day
      );

      const updatedAvailability = [...filteredAvailability, ...newSlots];

      return { ...prev, availability: updatedAvailability };
    });
    window.alert(`Availability for ${day} saved.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanedQualifications = formData.qualifications.filter(
      (q) => q.trim() !== ""
    );

    console.log(cleanedQualifications);

    const formPayload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (
        key === "qualifications" ||
        key === "appointmentTypes" ||
        key === "availability"
      ) {
        formPayload.append(key, JSON.stringify(value));
      } else {
        formPayload.append(key, value);
      }
    });

    formPayload.set("qualifications", JSON.stringify(cleanedQualifications));

    if (profilePicFile) {
      formPayload.append("profilePic", profilePicFile);
    }

    const method = operationType === "update" ? "put" : "post";

    try {
      const res = await axiosInstance[method]("/doctor/profile", formPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.alert(
        `Profile ${
          operationType === "update" ? "updated" : "created"
        } successfully!`
      );
      navigate("/profile");
    } catch (error) {
      window.alert(
        error.response?.data?.message || `Failed to ${operationType} profile.`
      );
    } finally {
      setLoading(false);
    }
  };

  const formattedAvailability = useMemo(() => {
    const defaultDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const map = new Map();
    formData.availability.forEach((a) => {
      if (!map.has(a.day)) {
        map.set(a.day, { rawSlots: [], displayTime: "Closed" });
      }
      map.get(a.day).rawSlots.push(a);
    });

    return defaultDays.map((day) => {
      const dayData = map.get(day);
      if (dayData && dayData.rawSlots.length > 0) {
        const times = dayData.rawSlots.map(
          (s) => `${s.startTime} - ${s.endTime}`
        );
        return {
          day,
          rawSlots: dayData.rawSlots,
          displayTime: times.join(" / "),
        };
      }
      return { day, rawSlots: [], displayTime: "Closed" };
    });
  }, [formData.availability]);

  if (loading && operationType === "update") {
    return (<LoadingBar/>)
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl my-10">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800 border-b pb-4">
          {operationType === "update" ? "Edit Profile" : "Create Profile"}
        </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="text-xl font-bold text-teal-700 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="+1234567890"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="name@clinic.com"
                required
              />
            </div>
          </div>
          {/* Profile Picture & Bio */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <img
                src={
                  profilePicFile
                    ? URL.createObjectURL(profilePicFile)
                    : currentProfilePicUrl || ""
                }
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <input
                type="file"
                id="profilePicInput"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="profilePicInput"
                className="px-3 py-1 text-sm font-medium text-white bg-teal-600 rounded-md cursor-pointer hover:bg-teal-700"
              >
                Change
              </label>
            </div>
            <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Dr. Amelia Harper is a compassionate and experienced..."
            />
          </div>
          {/* 2. Professional Details */}
          <h2 className="text-xl font-bold text-teal-700 mb-4">
            Professional Details
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience (Years)
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          {/* Qualifications */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualifications
            </label>
            {formData.qualifications.map((qual, index) => (
              <QualificationField
                key={index}
                index={index}
                value={qual}
                onChange={handleQualificationChange}
                onRemove={handleRemoveQualification}
              />
            ))}
            <button
              type="button"
              onClick={handleAddQualification}
              className="text-teal-600 flex items-center mt-2 hover:text-teal-800 text-sm font-medium"
            >
              <FaPlus />
              Add Qualification
            </button>
          </div>
          {/* 3. Clinic & Fees */}
          <h2 className="text-xl font-bold text-teal-700 mb-4">
            Clinic & Fees
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Clinic Address
              </label>
              <input
                type="text"
                name="clinicAddress"
                value={formData.clinicAddress}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consultation Fees (₹)
              </label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          {/* Appointment Types */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Types
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-1 text-gray-800">
                <input
                  type="checkbox"
                  name="appointmentTypes"
                  value="physical"
                  checked={formData.appointmentTypes.includes("physical")}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
                <span>Physical</span>
              </label>
              <label className="flex items-center space-x-1 text-gray-800">
                <input
                  type="checkbox"
                  name="appointmentTypes"
                  value="video"
                  checked={formData.appointmentTypes.includes("video")}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                />
                <span>Video</span>
              </label>
            </div>
          </div>
          {/* 4. Availability */}
          <h2 className="text-xl font-bold text-teal-700 mb-4">Availability</h2>
          <div className="border border-gray-200 rounded-lg p-4 mb-10">
            {formattedAvailability.map((item) => (
              <AvailabilityRow
                key={item.day}
                day={item.day}
                time={item.displayTime}
                onEdit={handleEditAvailability}
              />
            ))}
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-white bg-teal-600 font-semibold rounded-lg hover:bg-teal-700 disabled:bg-teal-400"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && selectedDay && (
        <AvailabilityEditorModal
          day={selectedDay}
          initialSlots={
            formattedAvailability.find((a) => a.day === selectedDay)
              ?.rawSlots || []
          }
          onSave={handleSaveAvailability}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default EditDoctorProfile;
