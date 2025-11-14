import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const CommunityTable = ({ communities, onDelete }) => {
  if (!communities.length) {
    return (
      <p className="text-center py-6 text-gray-500 text-sm">
        No communities found.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              COMMUNITY NAME
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              DISEASE
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              ADMIN
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              COMMUNITY STATS
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {communities.map((comm) => (
            <tr key={comm._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {comm.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {comm.disease || "N/A"}
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-900">
                  {comm.admin?.name || "N/A"}
                </p>
                <p className="text-xs text-gray-500">
                  {comm.admin?.role || ""}
                </p>
              </td>
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-700">
                  {comm.postCount || 0} Posts
                </p>
                <p className="text-xs text-gray-500">
                  {comm.members?.length || 0} Members
                </p>
              </td>
              <td className="px-6 py-4 text-right text-sm">
                <Link
                  to={`/community/${comm._id}`}
                  className="text-blue-600 hover:text-blue-800 mr-4"
                >
                  View
                </Link>
                <button
                  onClick={() => onDelete(comm)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {communities.map((comm) => (
          <div
            key={comm._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col space-y-2"
          >
            <div className="flex justify-between items-start">
              <p className="font-medium text-gray-900">{comm.name}</p>
              <div className="flex space-x-2">
                <Link
                  to={`/community/${comm._id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View
                </Link>
                <button
                  onClick={() => onDelete(comm)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Disease:</span>{" "}
              {comm.disease || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Admin:</span>{" "}
              {comm.admin?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Posts:</span> {comm.postCount || 0},{" "}
              <span className="font-medium">Members:</span>{" "}
              {comm.members?.length || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityTable;
