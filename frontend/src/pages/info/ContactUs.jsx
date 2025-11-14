import React, { useState } from "react";
import axiosInstance from "../../utilus/axiosInstance";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      // await axiosInstance.post("/contact", formData);
      // toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            We're here to help. Reach out to us through any of the channels
            below.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Send a Message */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the subject"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Other Ways to Reach Us
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md">
                  <span className="text-gray-600 font-medium">Support</span>
                  <a
                    href="mailto:support@healthconnect.com"
                    className="text-blue-600 hover:underline"
                  >
                    support@healthconnect.com
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md">
                  <span className="text-gray-600 font-medium">Sales</span>
                  <a
                    href="mailto:sales@healthconnect.com"
                    className="text-blue-600 hover:underline"
                  >
                    sales@healthconnect.com
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md">
                  <span className="text-gray-600 font-medium">General</span>
                  <a
                    href="mailto:info@healthconnect.com"
                    className="text-blue-600 hover:underline"
                  >
                    info@healthconnect.com
                  </a>
                </div>
                <div className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-md">
                  <span className="text-gray-600 font-medium">Phone</span>
                  <a
                    href="tel:+18005550199"
                    className="text-blue-600 hover:underline"
                  >
                    +1-800-555-0199
                  </a>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Our Location
              </h2>
              <p className="text-gray-600">
                123 HealthConnect Drive, Wellness City, USA 12345
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
