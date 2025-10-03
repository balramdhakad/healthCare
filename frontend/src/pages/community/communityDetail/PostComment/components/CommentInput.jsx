
import { useState } from "react";
import defaultProfile from "../../../../../assets/profile.png";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../../utilus/axiosInstance";
import toast from "react-hot-toast";

const CommentInput = ({ post, onCommentPosted }) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { userdata } = useSelector((state) => state.auth);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/community/${post.communityId}/posts/${post._id}/comment`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${userdata?.token}`,
          },
        }
      );

      setNewComment("");
      if(response?.data?.success){
          toast.success("Failed to post comment");
        }

      if (onCommentPosted) onCommentPosted(response.data.data);

    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="flex items-center mb-4">
        <img
          src={defaultProfile}
          alt="User"
          className="w-10 h-10 rounded-full mr-4"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handlePostComment}
          disabled={loading}
          className={`${
            loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
          } text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors`}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
