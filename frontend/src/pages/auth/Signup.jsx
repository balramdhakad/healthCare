// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import doctorImage from "../../assets/signup.png";
// import { signupUser } from "../../features/auth/authSlice";
// import { useDispatch, useSelector } from "react-redux";

// const Signup = () => {
//   const { userdata } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//     useEffect(() => {
//     if (userdata) {
//       navigate("/");
//     }
//   }, [userdata]);
  
//   const [formData, setFormData] = useState({
//     name: "",
//     mobileNo: "",
//     password: "",
//     role: "patient",
//   });



//   const handleChange = (e) => {
//     if (e.target.name === "mobileNo" && !/^\d*$/.test(e.target.value)) {
//       return;
//     }
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("hit from signup");
//     console.log(formData);
//     dispatch(signupUser(formData));
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full  xl:max-w-5xl md:max-w-7/8 flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
//         {/* Responsive Image Section */}
//         <div className="md:w-1/2 p-4 hidden md:flex items-center justify-center bg-indigo-50">
//           <img
//             src={doctorImage}
//             alt="Doctor Illustration"
//             className="object-cover w-full h-auto"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="md:w-1/2 p-15 md:p-10 space-y-6">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-gray-900">New Here!!</h2>
//             <p className="mt-2 text-sm text-gray-600">
//               SignUp to access your account
//             </p>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Mobile Number
//               </label>
//               <input
//                 type="tel"
//                 name="mobileNo"
//                 value={formData.mobileNo}
//                 onChange={handleChange}
//                 required
//                 maxLength={10}
//                 minLength={10}
//                 className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Role
//               </label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//               >
//                 <option value="patient">Patient</option>
//                 <option value="doctor">Doctor</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign Up
//             </button>
//           </form>
//           <div className="text-center text-xs text-gray-500">
//             <p>
//               By proceeding, you agree to our
//               <Link
//                 to={"/termsandconditions"}
//                 className="text-teal-600 hover:text-teal-500"
//               >
//                 Terms of Service
//               </Link>
//               and
//               <Link
//                 to={"/ploicy"}
//                 className="text-teal-600 hover:text-teal-500"
//               >
//                 Privacy Policy
//               </Link>
//               .
//             </p>
//           </div>
//           <p className="text-sm text-center text-gray-600">
//             Already have an account?
//             <Link
//               to="/login"
//               className="font-medium text-blue-600 hover:text-blue-400"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import doctorImage from "../../assets/signup.png";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axiosInstance from "../../utilus/axiosInstance";
import { signupUser } from "../../features/auth/authSlice";

const Signup = () => {
  const { userdata } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userdata) {
      navigate("/");
    }
  }, [userdata, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    password: "",
    role: "patient",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "mobileNo" && !/^\d*$/.test(e.target.value)) {
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (formData.mobileNo.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/send-otp", {
        mobileNo: formData.mobileNo,
      });
      if (res.data.success) {
        toast.success("OTP sent successfully");
        setOtpSent(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Enter OTP first");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/verify-otp", {
        ...formData,
        otp,
      });

      if (res.data.success) {
        toast.success("Account created successfully!");
        dispatch(signupUser(res.data));
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full xl:max-w-5xl md:max-w-7/8 flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:w-1/2 p-4 hidden md:flex items-center justify-center bg-indigo-50">
          <img
            src={doctorImage}
            alt="Doctor Illustration"
            className="object-cover w-full h-auto"
          />
        </div>

        <div className="md:w-1/2 p-8 md:p-10 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              New Here!!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign up to access your account
            </p>
          </div>

          <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={otpSent}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
                maxLength={10}
                minLength={10}
                disabled={otpSent}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={otpSent}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={otpSent}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading
                ? "Please wait..."
                : otpSent
                ? "Verify & Register"
                : "Send OTP"}
            </button>
          </form>

          <div className="text-center text-xs text-gray-500">
            <p>
              By proceeding, you agree to our
              <Link
                to={"/termsandconditions"}
                className="text-teal-600 hover:text-teal-500"
              >
                Terms of Service
              </Link>
              and
              <Link
                to={"/policy"}
                className="text-teal-600 hover:text-teal-500"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <p className="text-sm text-center text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-400"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
