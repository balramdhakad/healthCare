import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const CommunityTable = ({ communities, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
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
          {communities.length > 0 ? (
            communities.map((comm) => (
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
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-10 text-center text-md text-gray-500"
              >
                No communities found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommunityTable;
