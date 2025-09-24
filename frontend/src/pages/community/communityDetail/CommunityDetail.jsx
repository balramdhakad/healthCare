import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utilus/axiosInstance";
import { useSelector } from "react-redux";
import defaultProfile from "../../../assets/profile.png";
import LoadingBar from "../../../components/LoadingBar";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";
import CreatePostForm from "./PostComment/CreatePostForm";
import { FaDisease } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const CommunityDetail = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userdata } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await axiosInstance.get(`/community/${id}`, {
          headers: {
            Authorization: `Bearer ${userdata?.token}`,
          },
        });
        const { community, posts } = response.data.data;
        setCommunity(community);
        setPosts(posts);
      } catch (err) {
        setError("Failed to fetch community data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCommunityData();
  }, [id]);

  if (loading) {
    return <LoadingBar />;
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">
          Community not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {community?.name}
          </h1>
          <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
            {community?.description}
          </p>
        </div>

        {/* Community Info Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start justify-between">
          <div className="flex flex-col mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              About this group
            </h2>
            <div className="flex items-center text-gray-600 mb-2">
              <span className="mr-2 text-xl">
                <FaDisease />
              </span>
              <div className="text-base font-medium">
                Associated Disease:{" "}
                <span className="font-semibold">{community?.disease}</span>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2 text-xl">
                <ImProfile />
              </span>
              <div className="text-base font-medium">
                Administrator:{" "}
                <span className="font-semibold">{community?.admin?.name}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Members ({community?.members?.length})
            </h2>
            <div className="flex flex-wrap -space-x-2">
              {community.members.slice(0, 5).map((member) => (
                <div
                  key={member._id}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md"
                >
                  <img
                    src={defaultProfile}
                    alt={member?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {community?.members?.length > 5 && (
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-md flex items-center justify-center text-xs text-gray-600 font-semibold">
                  +{community.members.length - 5}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Community Feed Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Community Feed</h2>
        </div>

        <CreatePostForm
          communityId={community._id}
          onPostCreated={(newPost) => {
            setPosts([newPost, ...posts]);
          }}
        />

        <div className="space-y-6">
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
