import { FaComment } from "react-icons/fa";
import defaultProfile from "../../../../../assets/profile.png"
import FormatDate from "../../../../../components/FormateDate";

const Post = ({ post }) => (
  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
    <div className="flex items-center mb-4">
      <img
        src={post?.userId?.profilePic || defaultProfile}
        alt={post?.userId?.name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <div className="font-semibold text-gray-900">{post?.userId?.name}</div>
        <div className="text-sm text-gray-500">
          Posted {
          FormatDate(post.createdAt)}
        </div>
      </div>
    </div>
    <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
      {post.title}
    </h1>
    <p className="text-gray-700 mb-4">{post.content}</p>
    <div className="flex items-center text-gray-500 text-sm">
      <div className="flex items-center">
        <FaComment size={20} className="mr-1" /> {post.comments.length}
      </div>
    </div>
  </div>
);

export default Post