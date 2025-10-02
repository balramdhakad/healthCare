import React, { useState } from "react";
import { FaCheck, FaTimes, FaUserMd, FaMoneyBillWave } from "react-icons/fa";

const AppointmentActionModal = ({ action, appointment, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    let title, placeholder, submitText;
    let inputLabel = '';
    let isRequired = false;

    if (action === 'Approve') {
        title = `Approve Appointment for ${appointment.patientName}`;
        inputLabel = 'Token Number';
        placeholder = "Enter Token Number (optional, leave blank for auto-assign)";
        submitText = "Approve Appointment";
    } else if (action === 'Cancel') {
        title = `Cancel Appointment for ${appointment.patientName}`;
        inputLabel = 'Cancellation Reason';
        placeholder = "Reason for cancellation (REQUIRED)";
        isRequired = true;
        submitText = "Confirm Cancellation";
    } else if (action === 'Complete') {
        title = `Complete Appointment for ${appointment.patientName}`;
        inputLabel = "Doctor's Notes";
        placeholder = "Enter key consultation notes or follow-up instructions (Optional)";
        submitText = "Mark as Complete";
    }

    const handleSubmit = () => {
        if (action === 'Cancel' && !inputValue.trim()) {
            alert('Cancellation reason cannot be empty.');
            return;
        }
        
        setIsSubmitting(true);
        onSubmit(action, appointment._id || appointment.id, inputValue);
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <FaTimes />
                    </button>
                </div>

                {/* Appointment Info Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-sm">
                    <p className="font-bold text-gray-700 flex items-center mb-1">
                        <FaUserMd className="mr-2 text-blue-500" /> Patient: {appointment.patientName}
                    </p>

                </div>

                {/* Input Field */}
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                        {inputLabel} {isRequired && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type={action === 'Approve' ? 'number' : 'text'} 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={placeholder}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-teal-500"
                        required={isRequired}
                    />
                    {action === 'Approve' && (
                        <p className="text-xs text-gray-500 mt-1">If empty, token will be auto-assigned by the server.</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-5 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Close
                    </button>
                    <button 
                        type="button" 
                        onClick={handleSubmit} 
                        disabled={isSubmitting} 
                        className={`px-5 py-2 text-white font-semibold rounded-lg transition ${
                            action === 'Approve' ? 'bg-green-600 hover:bg-green-700' :
                            action === 'Complete' ? 'bg-blue-600 hover:bg-blue-700' :
                            'bg-red-600 hover:bg-red-700'
                        } disabled:opacity-50`}
                    >
                        {isSubmitting ? 'Processing...' : submitText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentActionModal;