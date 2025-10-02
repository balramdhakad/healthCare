import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaCloudUploadAlt } from 'react-icons/fa';
import { RiHealthBookFill } from 'react-icons/ri';
import axiosInstance from '../../utilus/axiosInstance';
import FormInput from './components/FormInput';
import ImageUploader from './components/ImageUploader';
import toast from 'react-hot-toast';

const AddMedicalHistory = () => {
    const navigate = useNavigate();
    const { userdata } = useSelector((state) => state.auth);
    const token = userdata?.token;

    const [formData, setFormData] = useState({
        condition: '',
        diagnosisDate: '',
        treatment: '',
        notes: '',
        doctorName: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        if (!formData.condition || !formData.diagnosisDate || !formData.treatment || !formData.doctorName) {
            toast.error('Please fill in the Condition, Diagnosis Date, Treatment, and Doctor\'s Name.');
            setSubmitting(false);
            return;
        }
        const formPayload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            formPayload.append(key, value);
        });

        if (imageFile) {
            formPayload.append('image', imageFile);
        }

        try {
            const res = await axiosInstance.post("/patient/medical-history", formPayload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            toast.success(res.data.message);
            navigate("/patient/medical-history");

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to add medical history.";
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 my-10 bg-white shadow-xl rounded-xl">
            <h1 className="text-2xl font-semibold text-gray-800">Add New Medical History</h1>
            <p className="text-gray-500 mb-6 text-sm">Fill in the details below to add a new record to your medical history.</p>

            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <FormInput
                        label="Condition"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        placeholder="e.g., Hypertension"
                        required
                    />
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
                    existingImageUrl={null}
                />
                
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2 text-white bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                    >
                        {submitting ? 'Saving Record...' : 'Save Record'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMedicalHistory;