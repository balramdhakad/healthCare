import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../features/auth/authSlice";
import { IoMdClose } from "react-icons/io";
import { RiMenuFoldLine } from "react-icons/ri";
const Navbar = () => {
  const { userdata } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  console.log(userdata);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-pink-50 shadow-lg">
      <div className="container mx-auto lg:px-6">
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          <div>
            <Link to="/" className="text-2xl font-bold text-blue-800">
              HealthConnect
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/doctors"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              Find a Doctor
            </Link>
            <Link
              to="/order"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              Order Now
            </Link>
            <Link
              to="/community"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              Community
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              Contact
            </Link>

            {/* Profile Logo */}

            {userdata ? (
              <>
                <Link
                  to="/patient/dashboard"
                  className="px-2 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => dispatch(logOutUser())}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-600 hover:text-gray-900 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? <RiMenuFoldLine /> : <IoMdClose />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu toggle */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="flex flex-col items-center py-2 space-y-2">
            <Link
              to="/"
              onClick={toggleMenu}
              className="block w-full px-6 py-2 text-gray-600 hover:bg-blue-200 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/doctors"
              onClick={toggleMenu}
              className="block w-full px-6 py-2 text-gray-600 hover:bg-gray-100 transition duration-300"
            >
              Find a Doctor
            </Link>
            <Link
              to="/order"
              onClick={toggleMenu}
              className="block w-full px-6 py-2 text-gray-600 hover:bg-gray-100 transition duration-300"
            >
              Order Now
            </Link>
            <Link
              to="/community"
              onClick={toggleMenu}
              className="block w-full px-6 py-2 text-gray-600 hover:bg-gray-100 transition duration-300"
            >
              Community
            </Link>
            <Link
              to="/contact"
              onClick={toggleMenu}
              className="block w-full px-6 py-2 text-gray-600 hover:bg-gray-100 transition duration-300"
            >
              Contact
            </Link>
            {userdata ? (
              <>
                <Link
                  to="/patient/dashboard"
                  onClick={toggleMenu}
                  className="block w-full px-6 py-2 text-gray-600 hover:bg-gray-100 transition duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={() => dispatch(logOutUser())}
                  className="block w-full px-6 py-2 bg-red-500 text-white hover:bg-gray-100 transition duration-300"
                >
                  LogOut
                </button>
              </>
            ) : (
              <Link
                onClick={toggleMenu}
                to="/login"
                className="block w-full bg-blue-500 py-2 px-6 text-white hover:bg-gray-100 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
