import axiosInstance from "../../utilus/axiosInstance";

export const handleLoginUser = async(formData) => {
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      console.log(response.data);
      localStorage.setItem('user-healthCare', JSON.stringify(response.data));
      return response.data
    } catch (error) {
      console.log(error);
    }
}
export const handleSignupUser = async(formData) => {
    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      console.log(response.data);
      localStorage.setItem('user-healthCare', JSON.stringify(response.data));
      return response.data
    } catch (error) {
      console.log(error);
    }
}