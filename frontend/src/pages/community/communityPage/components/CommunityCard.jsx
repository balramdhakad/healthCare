import { useSelector } from "react-redux";
import axiosInstance from "../../../../utilus/axiosInstance";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePostAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const CommunityCard = ({ community }) => {
  const { userdata } = useSelector((state) => state.auth);
  const [isMember, setIsMember] = useState(community.members.includes(userdata?.user?._id));
  const [loading, setLoading] = useState(false);

  const joinCommunity = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `community/${community._id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userdata?.token}`,
          },
        }
      );

      if (response.data.success) {
        window.alert("Community joined");
        setIsMember(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center space-x-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{community.name}</h3>
        </div>
      </div>

      <div className="flex flex-col space-y-1 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-2">
          <CgProfile size={15}/>
          <span>{community.members.length} members</span>
        </div>

        <div className="flex items-center space-x-2">
          <MdOutlinePostAdd size={15}/>
          <span>{community.postCount} posts</span>
        </div>
      </div>

      <button
        onClick={joinCommunity}
        disabled={isMember || loading}
        className={`w-full py-2 font-semibold rounded-lg transition-colors ${
          isMember
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : loading
            ? "bg-blue-400 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isMember ? "Joined" : loading ? "Joining..." : "Join Community"}
      </button>
      <Link to={`/community/${community._id}`}
        className="w-full text-center py-2 font-semibold bg-blue-400 mt-2 text-white rounded-lg transition-colors"
      >View More
      </Link>
    </div>
  );
};

export default CommunityCard;
