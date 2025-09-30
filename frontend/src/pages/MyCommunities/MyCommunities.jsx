import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from "react-redux";
import axiosInstance from '../../utilus/axiosInstance';
import LoadingBar from '../../components/LoadingBar';
import MyCommunityItem from './components/MyCommunities';

const MyCommunities = () => {
    const { userdata } = useSelector((state) => state.auth);
    const token = userdata?.token;
    
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyCommunities = useCallback(async () => {
        if (!token) {
            setError("User is not authenticated.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
          
            const response = await axiosInstance.get("/community/getMyCommunities", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setCommunities(response.data.data);
            } else {
                setError(response.data.message || "Failed to fetch communities.");
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Could not connect to the server or fetch data.");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchMyCommunities();
    }, [fetchMyCommunities]);

    if (loading) {
        return (
            <div className="p-6">
                <LoadingBar />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center bg-red-100 border border-red-400 text-red-700 rounded-lg mt-10">
                <h2 className="text-xl font-semibold mb-2">Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">My Communities</h1>
            
            {communities.length === 0 ? (
                <div className="p-10 text-center bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-600">You are not yet a member of any community.</p>
                    <Link to="/community/browse" className="text-blue-600 font-semibold mt-2 inline-block hover:underline">
                        Browse all communities
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {communities.map((community) => (
                        <MyCommunityItem key={community._id} community={community} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCommunities;