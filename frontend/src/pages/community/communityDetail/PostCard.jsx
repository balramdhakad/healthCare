import React from "react";
import defaultProfile from "../../../assets/profile.png"
import { Link } from "react-router-dom";

const PostCard = ({post}) => {
  return (
    <div
      key={post._id}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
          <img
            src={defaultProfile}
            alt={post?.userId?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {post?.userId?.name}
          </h3>
          <p className="text-sm text-gray-500">
            Posted on{" "}
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-xl font-bold text-gray-800 mb-2">{post?.title}</h4>
        <p className="text-gray-700 leading-relaxed">{post?.content}</p>
      </div>
      <Link to={`/community/post/${post._id}`} state={{post}} className="flex items-center text-blue-600 font-medium hover:underline cursor-pointer">
        View Comments ({post.comments?.length || 0}) →
      </Link>
    </div>
  );
};

export default PostCard;
