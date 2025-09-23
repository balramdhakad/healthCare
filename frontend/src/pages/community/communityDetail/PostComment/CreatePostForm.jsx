import { useState } from "react";
import axiosInstance from "../../../../utilus/axiosInstance";
import { useSelector } from "react-redux";

const CreatePostForm = ({ communityId, onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { userdata } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/community/${communityId}/posts`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${userdata?.token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Post created successfully!");
        setTitle("");
        setContent("");
        if (onPostCreated) onPostCreated(response.data.data);
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to create post.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-6"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Create a Post</h2>
      <input
        type="text"
        placeholder="Post title"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="What's on your mind?"
        className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className={`${
          loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors`}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CreatePostForm;
