import CommunityCard from "./components/CommunityCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utilus/axiosInstance";
import { FaPlus, FaSearch } from "react-icons/fa";
import LoadingBar from "../../../components/LoadingBar";

const CommunityPage = () => {
  const [communities, setCommunities] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCommunity = async () => {
    try {
      const response = await axiosInstance.get("/community");
      const data = response.data.data;
      setCommunities(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunity();
  }, []);

  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" min-h-screen font-sans antialiased text-gray-800">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
            Find Your Community
          </h1>
          <p className="text-lg text-gray-600">
            Discover and connect with people who share your interests.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for communities..."
            className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch size={20} />
          </span>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full">
              <LoadingBar />
            </div>
          ) : filteredCommunities.length === 0 ? (
            <div className="col-span-full text-center text-gray-600 text-lg">
              No communities found.
            </div>
          ) : (
            filteredCommunities.map((community) => (
              <CommunityCard key={community._id} community={community} />
            ))
          )}
        </div>

        {/* Create Community Button */}
        <Link
          to={`/community/createcommunity`}
          className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus />
        </Link>
      </main>
    </div>
  );
};

export default CommunityPage;
