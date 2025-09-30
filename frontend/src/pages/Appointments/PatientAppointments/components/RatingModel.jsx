import React, { useState } from 'react';
import axiosInstance from '../../../../utilus/axiosInstance';
import { useSelector } from 'react-redux';

const StarIcon = ({ color, size, onClick, onMouseEnter, onMouseLeave }) => (
    <svg
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        height={size}
        width={size}
        viewBox="0 0 24 24"
        fill={color}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cursor-pointer transition-colors duration-200 mx-1"
        style={{ color }}
    >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);



const RatingModal = ({ appointment, onClose, onRatingSubmitted }) => {
    
    const { userdata } = useSelector((state) => state.auth);
    const token = userdata?.token;
    
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const doctorName = appointment?.doctorId?.name || 'Doctor';
    const appointmentId = appointment?._id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            window.alert('Please select a star rating (1 to 5).');
            return;
        }

        setSubmitting(true);
        
        const payload = { rating, comment };
        
        try {
            const res = await axiosInstance.put( 
                `/appointment/${appointmentId}/rate`, 
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success) {
                window.alert(res.data.message);
                onRatingSubmitted(appointmentId, res.data.data.rating); 
                onClose();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to submit rating.';
            window.alert(errorMessage);
            console.error('Rating submission error:', error.response || error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Rate Your Visit</h3>
                <p className="text-gray-600 mb-6">How was your appointment with <span className="font-semibold text-blue-600">Dr. {doctorName}</span>?</p>
                
                <form onSubmit={handleSubmit}>
                    {/* Star Rating Section */}
                    <div className="flex justify-center mb-6">
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                        className="hidden"
                                        disabled={submitting}
                                    />
                                    <StarIcon
                                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        size={35}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    
                    {/* Comment Section */}
                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                            Comments (Max 500 characters)
                        </label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="4"
                            maxLength="500"
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Share your experience..."
                            disabled={submitting}
                        />
                    </div>
                    
                    {/* Actions */}
                    <div className="flex justify-end space-x-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                            disabled={submitting}
                        >
                            {submitting ? 'Submitting...' : 'Submit Rating'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RatingModal;
