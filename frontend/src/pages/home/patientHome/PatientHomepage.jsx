import DoctorCategoryGrid from "./components/DoctorCategoryGrid";
import SectionTitle from "./components/SectionTitle";
import HealthSteps from "./components/HeathCareSteps";
import FeedbackCard from "./components/FeedbackCard";
import { useEffect, useState, useRef } from "react";
import KeyFeatures from "./components/KeyFeatures";
import CommunityCard from "./components/CommunityCard";
import DoctorProfileCard from "./components/DoctorProfileCard";
import TopLevelActions from "./components/TopLevelActions";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axiosInstance from "../../../utilus/axiosInstance";
import Benefits from "./components/Benefits";
import PatientProfileMinimal from "../../../components/PatientProfileMinimal";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "../../../components/LoadingBar";

const HorizontalCarousel = ({ title, children, scrollAmount = 300 }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        carouselRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="mb-12 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-tight">
          {title}
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Carousel Content */}
      <div
        ref={carouselRef}
        className="flex space-x-6 overflow-x-auto no-scrollbar scroll-smooth pb-3"
      >
        {children}
      </div>
    </div>
  );
};

const PatientHomepage = ({ userdata }) => {
  const fetchTopRated = async () => {
    const response = await axiosInstance.get("/general/top-rated");
    return response.data.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["topRated"],
    queryFn: fetchTopRated,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const doctors = data?.topDoctors || [];
  const communities = data?.topCommunities || [];
  const feedbacks = data?.topRatedAppointments || [];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-4 space-y-16">
        {userdata ? (
          <>
            <PatientProfileMinimal />
          </>
        ) : (
          <></>
        )}
        <div className="space-y-0">
          <KeyFeatures />
        </div>
        <TopLevelActions />
        <div className="bg-white shadow-sm rounded-2xl p-6">
          <SectionTitle title="Browse By Category" />
          <DoctorCategoryGrid />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <HealthSteps />
        </div>
        <div className="space-y-12">
          <div>
            <SectionTitle title="Top-Rated Doctors" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {isLoading ? (
                <div className="w-full">


                  <LoadingBar />
                </div>
              ) : (
                doctors
                  .map((doctor) => (
                    <DoctorProfileCard key={doctor._id} doctor={doctor} />
                  ))
              )}
            </div>
          </div>

          <HorizontalCarousel title="Top Communities">
            {isLoading ? <LoadingBar/>:
            
            communities.map((community) => (
              <CommunityCard key={community._id} community={community} />
            ))}
          </HorizontalCarousel>

          <HorizontalCarousel title="Recent Patient Feedback">
            {isLoading ? <LoadingBar/>:feedbacks.map((feedback) => (
              <FeedbackCard key={feedback._id} feedback={feedback} />
            ))}
          </HorizontalCarousel>

          <Benefits />
        </div>
      </div>
    </div>
  );
};

export default PatientHomepage;
