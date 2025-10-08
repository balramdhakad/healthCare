import { Link } from "react-router-dom";
import defaultProfile from "../../../../../assets/profile.png";
import FormatDate from "../../../../../components/FormateDate";

const Comment = ({ comment }) => (
  <div className="flex items-start mb-6">
    <img
      src={comment?.userId?.profilePic || defaultProfile}
      alt={comment?.userId?.name}
      className="w-10 h-10 object-cover rounded-full mr-4 flex-shrink-0"
    />
    <div className="flex-grow">
      <div className="flex items-center justify-between mb-1">
        {comment?.userId.role === "doctor" ? (
          <Link
            to={`/doctor/${comment?.userId._id}`}
            className="font-semibold text-blue-600"
          >
            {comment?.userId?.name}
          </Link>
        ) : (
          <div className="font-semibold text-gray-900">
            {comment?.userId?.name}
          </div>
        )}

        <div className="text-sm text-gray-500">
          {FormatDate(comment?.createdAt)}
          <div className="text-xs font-bold bg-blue-400 text-center p-1 rounded-sm text-white">
            {comment.userId.role.toUpperCase()}
          </div>
        </div>
      </div>
      <p className="text-gray-700">{comment.text}</p>
    </div>
  </div>
);

export default Comment;
