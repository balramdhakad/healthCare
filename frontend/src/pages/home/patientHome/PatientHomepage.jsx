import DoctorCategoryGrid from "./components/DoctorCategoryGrid";
import SectionTitle from "./components/SectionTitle";
import HealthSteps from "./components/HeathCareSteps";
import FeedbackCard from "./components/FeedbackCard";
import { useEffect } from "react";
import { useState } from "react";
import KeyFeatures from "./components/KeyFeatures";
import CommunityCard from "./components/CommunityCard";
import DoctorProfileCard from "./components/DoctorProfileCard";
import TopLevelActions from "./components/TopLevelActions";
import Footer from "../../../components/Footer";


import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axiosInstance from "../../../utilus/axiosInstance";

const HorizontalCarousel = ({ title, children }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, 
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-8 relative ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors duration-200 focus:outline-none"
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors duration-200 focus:outline-none"
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="flex space-x-4 overflow-x-auto custom-scrollbar hide-scrollbar pb-2"
      >
        {children}
      </div>
    </div>
  );
};



const PatientHomepage = () => {
  const [doctors, setDoctors] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchData = async () => {
    const response = await axiosInstance.get("/general/top-rated");
    const data = response.data.data;
    setDoctors(data.topDoctors);
    setCommunities(data.topCommunities);
    setFeedbacks(data.topRatedAppointments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-gray-100 p-8 pt-20">
        <div className="container mx-auto space-y-12">
          <TopLevelActions />
          <DoctorCategoryGrid />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HealthSteps />
            <div className="space-y-4">
              <SectionTitle title="Features You Will Love" />
              <KeyFeatures />
            </div>
          </div>
          <div className="space-y-8">
            <HorizontalCarousel title="Top-Rated Doctors">
              {doctors.map((doctor) => (
                <DoctorProfileCard key={doctor._id} doctor={doctor} />
              ))}
            </HorizontalCarousel>
            <HorizontalCarousel title="Top Communities">
              {communities.map((community) => (
                <CommunityCard key={community._id} community={community} />
              ))}
            </HorizontalCarousel>
            <HorizontalCarousel title="Recent Patient Feedback">
              {feedbacks.map((feedback) => (
                <FeedbackCard key={feedback._id} feedback={feedback} />
              ))}
            </HorizontalCarousel>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientHomepage;
