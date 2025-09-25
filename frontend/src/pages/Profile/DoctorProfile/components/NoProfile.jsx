import { Link } from "react-router-dom";

const NoProfileUI = () => {
    let operationType = "create"
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-white border border-gray-200 rounded-xl shadow-lg m-10 max-w-2xl mx-auto">
      <svg
        className="w-16 h-16 text-teal-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        Profile Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        It looks like you haven't created your professional profile yet.
      </p>
      <Link to={"/profile/edit"} state={operationType}
        className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg shadow-md hover:bg-teal-700 transition duration-200"
      >
        Create Your Profile
      </Link>
    </div>
  );
};

export default NoProfileUI