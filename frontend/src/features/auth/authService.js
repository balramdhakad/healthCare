import toast from "react-hot-toast";
import axiosInstance from "../../utilus/axiosInstance";

export const handleLoginUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/auth/login", formData);
    toast.success(response?.data?.message);
    localStorage.setItem("user-healthCare", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something Went Wrong");
  }
};
export const handleSignupUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", formData);
    toast.success(response?.data?.message);
    localStorage.setItem("user-healthCare", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something Went Wrong");
  }
};
