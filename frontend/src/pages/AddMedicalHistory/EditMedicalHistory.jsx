import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarAlt, FaCloudUploadAlt } from "react-icons/fa";
import { RiHealthBookFill } from "react-icons/ri";
import axiosInstance from "../../utilus/axiosInstance";
import LoadingBar from "../../components/LoadingBar";
import FormInput from "./components/FormInput";
import ImageUploader from "./components/ImageUploader";


const EditMedicalHistory = () => {
  const navigate = useNavigate();
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;
  const { id } = useParams();

  const [formData, setFormData] = useState({
    condition: "",
    diagnosisDate: "",
    treatment: "",
    notes: "",
    doctorName: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  const fetchRecord = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/patient/medical-history/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const record = res.data.data;

      const formattedDate = record.diagnosisDate
        ? new Date(record.diagnosisDate).toISOString().split("T")[0]
        : "";

      setFormData({
        condition: record.condition || "",
        diagnosisDate: formattedDate,
        treatment: record.treatment || "",
        notes: record.notes || "",
        doctorName: record.doctorName || "",
      });
      setExistingImageUrl(record.image || "");
    } catch (error) {
      window.alert("Failed to load medical record .");
      navigate("/patient/medical-history");
    } finally {
      setLoading(false);
    }
  }, [id, token, navigate]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (
      !formData.condition ||
      !formData.diagnosisDate ||
      !formData.treatment ||
      !formData.doctorName
    ) {
      window.alert(
        "Please fill in the Condition, Diagnosis Date, Treatment, and Doctor's Name."
      );
      setSubmitting(false);
      return;
    }

    const formPayload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });

    if (imageFile) {
      formPayload.append("image", imageFile);
    }


    try {
      const res = await axiosInstance.put(`/patient/medical-history/${id}`, formPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.alert(res.data.message);
      navigate("/patient/medical-history");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update medical history.";
      window.alert(errorMessage);
      console.error("Submission error:", error.response || error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-xl rounded-xl text-center">
        <LoadingBar />
      </div>
    );
  }

  const pageTitle = "Edit Medical History Record";
  const submitButtonText = "Update Record";

  return (
    <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-semibold text-gray-800">{pageTitle}</h1>
      <p className="text-gray-500 mb-6 text-sm">
        Modify the details below to update the record.
      </p>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-2 gap-6 mb-4">
          {/* Condition Input */}
          <FormInput
            label="Condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            placeholder="e.g., Hypertension"
            required
          />
          {/* Diagnosis Date Input */}
          <FormInput
            label="Diagnosis Date"
            name="diagnosisDate"
            value={formData.diagnosisDate}
            onChange={handleChange}
            type="date"
            icon={FaCalendarAlt}
            required
          />
        </div>

        {/* Treatment Input */}
        <div className="mb-4">
          <FormInput
            label="Treatment"
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            placeholder="e.g., Medication, Therapy"
            required
          />
        </div>

        {/* Notes Input */}
        <div className="mb-4">
          <FormInput
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional information about the condition or treatment..."
            isTextArea
            rows={4}
          />
        </div>

        {/* Doctor's Name Input */}
        <div className="mb-6">
          <FormInput
            label="Doctor's Name"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            placeholder="Dr. Emily Carter"
            icon={RiHealthBookFill}
            required
          />
        </div>

        <ImageUploader
            imageFile={imageFile}
            handleFileChange={handleFileChange}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            existingImageUrl={existingImageUrl}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting || loading}
            className="px-6 py-2 text-white bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {submitting ? "Processing..." : submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMedicalHistory;