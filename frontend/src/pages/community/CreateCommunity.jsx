import React, { useState } from "react";
import axiosInstance from "../../utilus/axiosInstance";
import { useSelector } from "react-redux";

const CreateCommunity = () => {
  const { userdata } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    disease: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (!formData.name || !formData.description || !formData.disease) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/community", formData, {
        headers: {
          Authorization: `Bearer ${userdata?.token}`,
        },
      });
      if (response.data.success) {
        setMessage({
          text: response.data.message,
          type: "success",
        });
        setFormData({ name: "", description: "", disease: "" });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center font-sans antialiased">
      <div className="w-full max-w-2xl mx-auto p-4 md:p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            Create a New Community
          </h1>
          <p className="text-lg text-gray-600">
            Connect with others who share your journey.
          </p>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Community Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Heart Disease"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-700 font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Share what your community is about..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none"
              ></textarea>
              <p className="text-sm text-gray-500 mt-2">
                A brief description helps people understand the purpose of your
                group.
              </p>
            </div>

            <div className="mb-8">
              <label
                htmlFor="disease"
                className="block text-gray-700 font-semibold mb-2"
              >
                Associated Disease
              </label>
              <input
                type="text"
                id="disease"
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                placeholder="e.g., Heart Disease , Heart attack"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            {message.text && (
              <div
                className={` mb-6 p-2 rounded-lg font-medium text-center ${
                  message.type === "error"
                    ? "bg-red-100 text-red-700 "
                    : "bg-green-100 text-green-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-lg transition duration-300 ease-in-out transform ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-md"
              }`}
            >
              {loading ? "Creating..." : "Create Community"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;
