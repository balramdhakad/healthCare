import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://healthcare-jgwr.onrender.com/api",
});

export default axiosInstance;
