import React, { useState, useEffect } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

// Sample FAQ data
const faqData = [
  {
    category: "General",
    faqs: [
      {
        question: "What is HealthConnect?",
        answer:
          "HealthConnect is a comprehensive platform that helps you manage your health records, connect with top-rated doctors, and join patient communities for support.",
      },
      {
        question: "How do I create an account?",
        answer:
          "You can sign up by clicking on the 'Sign Up' button on the top right corner of the page and following the instructions.",
      },
      {
        question: "Is my information secure?",
        answer:
          "Yes, we use industry-standard encryption and security protocols to protect your data. Your privacy is our top priority.",
      },
    ],
  },
  {
    category: "For Doctors",
    faqs: [
      {
        question: "How do I list my practice on HealthConnect?",
        answer:
          "To list your practice, you must first register as a professional. You'll need to provide your professional credentials and a valid medical license for verification.",
      },
      {
        question: "What are the fees for using HealthConnect?",
        answer:
          "The fees vary depending on the service plan you choose. We offer different tiers for individual practitioners and clinics. You can find detailed pricing on our 'Pricing' page.",
      },
    ],
  },
  {
    category: "For Patients",
    faqs: [
      {
        question: "How do I find a doctor?",
        answer:
          "You can find a doctor using our search bar. You can filter by specialization, location, ratings, and more to find the best fit for your needs.",
      },
      {
        question: "How do I book an appointment?",
        answer:
          "You can book an appointment by selecting a doctor and choosing an available date and time from their calendar. You will receive a confirmation once the doctor approves the appointment.",
      },
    ],
  },
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(faqData);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(faqData);
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const newFilteredData = faqData.map((category) => {
      const filteredFaqs = category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lowerCaseSearchTerm) ||
          faq.answer.toLowerCase().includes(lowerCaseSearchTerm)
      );
      return {
        ...category,
        faqs: filteredFaqs,
      };
    }).filter((category) => category.faqs.length > 0);

    setFilteredData(newFilteredData);
  }, [searchTerm]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Can't find the answer you're looking for? Reach out to our customer support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for a question"
            className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQ Sections */}
        {filteredData.map((category, catIndex) => (
          <div key={catIndex} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.faqs.map((faq, index) => {

                const uniqueKey = `${catIndex}-${index}`;
                return (
                  <div key={uniqueKey} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(uniqueKey)}
                      className="w-full flex justify-between items-center text-left p-6 font-semibold text-gray-800 focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <FaChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${openIndex === uniqueKey ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === uniqueKey
                          ? "max-h-96 opacity-100 p-6 pt-0"
                          : "max-h-0 opacity-0 p-0"
                        }`}
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500">
            No results found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;