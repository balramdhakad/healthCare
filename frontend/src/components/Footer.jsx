import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl font-bold text-blue-600">HealConnect</h1>
            <p className="mt-2 text-sm text-gray-400 max-w-xs">
              Your trusted partner in healthcare. Connect with doctors, manage
              records, and find support.
            </p>
          </div>

          {/* Navigation Links Section */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h4 className="font-semibold text-gray-200 mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-teal-400 transition duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-teal-400 transition duration-300"
                  >
                    Find Doctor
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-teal-400 transition duration-300"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-teal-400 transition duration-300"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-200 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-teal-400 transition duration-300"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-teal-400 transition duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-teal-400 transition duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="hover:text-teal-400 transition duration-300"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Icons */}
            <div>
              <h4 className="font-semibold text-gray-200 mb-3">Connect</h4>
              <div className="flex space-x-4 text-gray-400">
                <Link
                  to={"/"}
                  className="hover:text-teal-400 transition duration-300"
                >
                  <FaFacebook size={20} />
                </Link>
                <Link
                  to={"/"}
                  className="hover:text-teal-400 transition duration-300"
                >
                  <FaTwitter size={20} />
                </Link>
                <Link
                  to={"/"}
                  className="hover:text-teal-400 transition duration-300"
                >
                  <FaInstagram size={20} />
                </Link>
                <Link
                  to={"/"}
                  className="hover:text-teal-400 transition duration-300"
                >
                  <FaLinkedin size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2025 Healhub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
