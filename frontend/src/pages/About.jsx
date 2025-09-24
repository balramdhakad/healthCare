import React from 'react';
import { Link } from 'react-router-dom';
import team1 from "../assets/team1.jpeg"
import team2 from "../assets/team2.jpeg"
import team3 from "../assets/team3.jpeg"
import { FaPhoneAlt } from 'react-icons/fa';
import { MdAttachEmail } from 'react-icons/md';

// Sample data for team members
const teamMembers = [
    {
        name: "Dr. Emily Carter",
        title: "CEO",
        profilePic: team2,
        description: "Experienced healthcare administrator with a passion for innovation.",
    },
    {
        name: "Dr. David Lee",
        title: "CTO",
        profilePic: team1,
        description: "Technology leader with a strong background in healthcare IT.",
    },
    {
        name: "Sarah Chen",
        title: "Head of Product",
        profilePic:team3,
        description: "Product strategist focused on user experience and accessibility.",
    },
];

// Reusable component for a single team member card
const TeamMemberCard = ({ member }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
        <img
            src={member.profilePic}
            alt={member.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h4 className="text-xl font-bold text-gray-800">{member.name}</h4>
        <p className="text-blue-600 font-medium">{member.title}</p>
        <p className="mt-2 text-sm text-gray-600 max-w-xs">{member.description}</p>
    </div>
);

const About = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* About Section */}
            <section className="text-center py-16 px-4">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        About HealthConnect
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Connecting patients with the right healthcare providers, ensuring timely and quality care. We strive to make healthcare accessible and efficient for everyone.
                    </p>
                </div>
            </section>

            {/* Our Story, Vision, and Values Section */}
            <section className="bg-white py-16 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed">
                            HealthConnect was founded in 2025 by a team of healthcare professionals and technology experts who recognized the need for a more streamlined and user-friendly way to manage health. Our journey began with a simple idea: to bridge the gap between patients and providers, making healthcare more accessible and efficient. Today, we are proud to serve thousands of patients and providers across the nation.
                        </p>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                To be the leading platform for healthcare management, empowering patients and providers to achieve better health outcomes through technology and innovation.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
                            <p className="mt-2 text-gray-600 leading-relaxed">
                                Integrity, patient-centricity, innovation, and collaboration are at the core of everything we do.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
                        Meet Our Team
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={index} member={member} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Get in Touch Section */}
            <section className="bg-white py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Have questions? We're here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-600">
                        <div className="flex items-center space-x-2">
                            <MdAttachEmail />
                            <a href="mailto:info@healthconnect.com" className="text-gray-700 hover:text-blue-600">info@healthconnect.com</a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaPhoneAlt className={"text-blue-400"}/>
                            <span className="text-gray-700">+1-800-555-0199</span>
                        </div>
                    </div>
                    <Link to={"/info/contact"}>
                    
                    <button  className="mt-8 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        More Contact Options
                    </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;