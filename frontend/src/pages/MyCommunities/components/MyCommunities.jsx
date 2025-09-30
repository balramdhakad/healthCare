
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { MdOutlinePostAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const MyCommunityItem = ({ community }) => {
  return (
    <div className="flex flex-col p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{community.name}</h3>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-2">
          <CgProfile size={15}/>
          <span>{community.members.length} members</span>
        </div>

        <div className="flex items-center space-x-2">
          <MdOutlinePostAdd size={15}/>
          <span>{community.postCount} posts</span>
        </div>
      </div>

      <Link 
        to={`/community/${community._id}`}
        className="w-full text-center py-2 font-semibold bg-blue-600 text-white rounded-lg transition-colors hover:bg-blue-700"
      >
        Go to Community
      </Link>
    </div>
  );
};

export default MyCommunityItem;