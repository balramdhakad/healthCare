import { Link } from "react-router-dom";
import image from "../../../../assets/community.png"

const CommunityCard = ({community}) => (
  <Link
    to={`community/${community._id}`}
    className="flex-shrink-0 w-60 p-4 bg-white rounded-xl shadow-md"
  >
    <img
      src={image}
      alt={community.name}
      className="w-full h-24 object-cover rounded-md"
    />
    <div className="mt-4 text-center">
      <h4 className="font-semibold text-gray-900">{community.name}</h4>
      <p className="text-sm text-gray-500">{community.membersCount} members</p>
      <p className="text-sm text-gray-500">{community.postCount} Posts</p>
    </div>
  </Link>
);

export default CommunityCard