import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../utilus/axiosInstance";
import { useSelector } from "react-redux";
import AddressInputFields from "./components/AddressInputFields";

const AddressForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { userdata } = useSelector((state) => state.auth);
  const token = userdata?.token;

  const [formData, setFormData] = useState({
    fullname: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: "",
    country: "India",
    phone_number: "",
    address_type: "residential",
  });

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchAddress(id);
    }
  }, [id]);

  const fetchAddress = async (addressId) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(res.data.data);
    } catch {
      toast.error("Failed to load address");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEditMode) {
        await axiosInstance.put(`/addresses/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Address updated successfully");
      } else {
        await axiosInstance.post("/addresses", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Address added successfully");
      }
      navigate("/profile");
    } catch {
      toast.error("Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {isEditMode ? "Edit Address" : "Add New Address"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AddressInputFields formData={formData} handleChange={handleChange} />
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Update Address"
                : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
