import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import doctorImage from "../../assets/signup.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userdata } = useSelector((state) => state.auth);

useEffect(() => {
  if (userdata) {
    if (userdata?.user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }
}, [userdata, navigate]);


  const [formData, setFormData] = useState({
    mobileNo: "",
    password: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "mobileNo" && !/^\d*$/.test(e.target.value)) {
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
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

        {/* Form Section */}
        <div className="md:w-1/2 p-15 md:p-10 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Login in to access your account
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
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
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>

          <div className="text-center text-xs text-gray-500">
            <p>
              By proceeding, you agree to our{" "}
              <Link
                to={"/termsandconditions"}
                className="text-teal-600 hover:text-teal-500"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to={"/ploicy"}
                className="text-teal-600 hover:text-teal-500"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import loginImage from "../../assets/signup.png";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../features/auth/authSlice";

// const Login = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     mobileNo: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     if (e.target.name === "mobileNo" && !/^\d*$/.test(e.target.value)) {
//       return;
//     }
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(loginUser(formData));
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
//           <p className="mt-2 text-sm text-gray-600">Sign in to access your account</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 sr-only">
//               Mobile Number
//             </label>
//             <input
//               type="tel"
//               name="mobileNo"
//               value={formData.mobileNo}
//               onChange={handleChange}
//               required
//               maxLength={10}
//               minLength={10}
//               placeholder="Mobile Number"
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 sr-only">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               placeholder="Password"
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
//             />
//           </div>
//           <div className="text-right">
//             <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-500">
//               Forgot Password?
//             </a>
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
//           >
//             Log in
//           </button>
//         </form>
//         <div className="text-center text-xs text-gray-500">
//           <p>
//             By proceeding, you agree to our{" "}
//             <Link to={"/termsandconditions"} className="text-teal-600 hover:text-teal-500">
//               Terms of Service
//             </Link>{" "}
//             and{" "}
//             <Link to={"/ploicy"} className="text-teal-600 hover:text-teal-500">
//               Privacy Policy
//             </Link>
//             .
//           </p>
//         </div>
//         <p className="text-sm text-center text-gray-600">
//           Don't have an account?{" "}
//           <Link
//             to="/signup"
//             className="font-medium text-teal-600 hover:text-teal-500"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
