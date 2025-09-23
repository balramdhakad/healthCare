import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingBar from "../../../components/LoadingBar";
import axiosInstance from "../../../utilus/axiosInstance";
import { useSelector } from "react-redux";

import Comment from "./PostComment/components/Comment";
import Post from "./PostComment/components/Post";
import CommentInput from "./PostComment/components/CommentInput";



const PostComment = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { userdata } = useSelector((state) => state.auth);

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(`community/post/${id}`, {
        headers: {
          Authorization: `Bearer ${userdata?.token}`,
        },
      });
      setPost(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        {/* Post Section */}
        {post && <Post post={post} />}

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>
          {post?.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>

        <CommentInput post={post} onCommentPosted={fetchPost}/>
      </div>
    </div>
  );
};

export default PostComment;
