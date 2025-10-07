import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../features/auth/authSlice";
import { IoMdClose } from "react-icons/io";
import { RiMenuFoldLine } from "react-icons/ri";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
const Navbar = () => {
  const { userdata } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  console.log(userdata);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className=" p-1 shadow-lg ">
      <div className="container mx-auto lg:px-6">
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          <div>
            <Link to="/" className="text-2xl font-bold text-blue-800">
              HealthConnect
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-[16px] font-medium">
            {userdata?.user?.role === "patient" ? (
              <Link
                to="/doctors"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Find a Doctor
              </Link>
            ) : (
              <Link
                to="/appointments"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Appointments
              </Link>
            )}
            <Link
              to="/shop"
              className="text-gray-700 hover:text-blue-600 transition "
            >
              Shop
            </Link>
            <Link
              to="/community"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Community
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>

            {/* Profile Logo */}

            {userdata ? (
              <>
                {/* Dashboard Dropdown */}
                <div className="relative group hidden md:block">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors duration-300">
                    Dashboard
                  </button>

                  {/* Dropdown content */}
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/cart"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Cart
                    </Link>
                    <Link
                      to="/myorders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/appointments"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      Appointments
                    </Link>
                    {userdata?.user?.role === "patient" ? (
                      <Link
                        to="patient/medical-history"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        Medical Historty
                      </Link>
                    ) : (
                      <></>
                    )}
                    <Link
                      to="/mycommunity"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      My Communities
                    </Link>
                  </div>
                </div>

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
              {isMenuOpen ? (
                <IoMdClose size={40} />
              ) : (
                <RiMenuFoldLine size={40} />
              )}
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
              className="block w-full px-6 py-2 rounded hover:bg-blue-100 transition"
            >
              Home
            </Link>
            {userdata?.user?.role == "patient" ? (
              <Link
                to="/doctors"
                onClick={toggleMenu}
                className="block w-full px-6 py-2 rounded hover:bg-blue-100 transition"
              >
                Find a Doctor
              </Link>
            ) : (
              <></>
            )}
            <Link
              to="/shop"
              onClick={toggleMenu}
              className="block w-full px-6 py-2 rounded hover:bg-blue-100 transition"
            >
              Shop
            </Link>
            <Link
              to="/community"
              onClick={toggleMenu}
              className="block w-full px-6 py-2 rounded hover:bg-blue-100 transition"
            >
              Community
            </Link>
            <Link
              to="/about"
              onClick={toggleMenu}
              className="block w-full px-6 py-2 rounded hover:bg-blue-100 transition"
            >
              About
            </Link>
            {userdata ? (
              <>
                <div className="w-full">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center justify-between w-full px-6 py-2 text-gray-600 hover:bg-gray-100 transition rounded"
                  >
                    Dashboard
                    {isProfileOpen ? (
                      <IoChevronUpSharp size={18} />
                    ) : (
                      <IoChevronDownSharp size={18} />
                    )}
                  </button>

                  {isProfileOpen && (
                    <div className="pl-8 py-1 space-y-1">
 
                      <Link
                        to="/profile"
                        onClick={() => {
                          toggleMenu();
                          setIsProfileOpen(false);
                        }}
                        className="block px-2 py-2 text-sm text-blue-800 hover:bg-blue-100 rounded transition"
                      >
                        Profile
                      </Link>
 
                      <Link
                        to="/cart"
                        onClick={() => {
                          toggleMenu();
                          setIsProfileOpen(false);
                        }}
                        className="block px-2 py-2 text-sm text-blue-800 hover:bg-blue-100 rounded transition"
                      >
                        Cart
                      </Link>
                      <Link
                        to="/myorders"
                        onClick={() => {
                          toggleMenu();
                          setIsProfileOpen(false);
                        }}
                        className="block px-2 py-2 text-sm text-blue-800 hover:bg-blue-100 rounded transition"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/appointments"
                        onClick={() => {
                          toggleMenu();
                          setIsProfileOpen(false);
                        }}
                        className="block px-2 py-2 text-sm text-blue-800 hover:bg-blue-100 rounded transition"
                      >
                        Appointments
                      </Link>
                      {userdata?.user?.role === "patient" ? (
                        <Link
                          to="/patient/medical-history"
                          onClick={() => {
                            toggleMenu();
                            setIsProfileOpen(false);
                          }}
                          className="block px-2 py-2 text-sm text-blue-800 hover:bg-blue-100 rounded transition"
                        >
                          Medical History
                        </Link>
                      ) : (
                        <></>

                      )}

                      <Link
                        to="/mycommunity"
                        onClick={() => {
                          toggleMenu();
                          setIsProfileOpen(false);
                        }}
                        className="block px-2 py-2 text-sm text-blue-800 hover:bg-blue-100 rounded transition"
                      >
                        My Communities
                      </Link>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => dispatch(logOutUser())}
                  className="block w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600 transition"
                >
                  LogOut
                </button>
              </>
            ) : (
              <Link
                onClick={toggleMenu}
                to="/login"
                className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
