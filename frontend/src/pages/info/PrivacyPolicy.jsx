import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-2">
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-gray-500 mb-12">
          Last updated: October 26, 2025
        </p>

        <div className="space-y-8">
          {/* Introduction */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to the Privacy Policy of HealthConnect. This policy outlines how we collect, use, and protect your personal information. By using our services, you agree to the terms described herein. We are committed to safeguarding your privacy and ensuring the security of your data.
            </p>
          </div>

          {/* Data Collection */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Data Collection
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect various types of data to provide and improve our services. This includes personal information such as your name, contact details, and date of birth, as well as medical details. We also collect non-identifiable information like browsing activity and device information. Data is collected through direct interactions with our platform, automated means, and third-party sources.
            </p>
          </div>

          {/* Use of Data */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Use of Data
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The data we collect is used for several purposes, including managing appointments, providing healthcare services, communicating with you, and improving our platform's functionality. We may also use your data for research and analytics to better understand our user base and service trends. This information helps us personalize your experience and ensure efficient service delivery.
            </p>
          </div>

          {/* Data Sharing */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Data Sharing
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may share your data with healthcare providers, service providers, and other third parties necessary to deliver our services. We ensure that all data-sharing complies with applicable privacy laws and regulations. We do not sell your personal information to third parties. Data-sharing is essential to enable collaboration for providing and improving our services.
            </p>
          </div>

          {/* Data Retention */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Data Retention
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your data for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes. The retention period may vary depending on the type of data and the specific circumstances. We implement measures to securely delete or anonymize data when it is no longer needed.
            </p>
          </div>

          {/* User Rights */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              User Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, correct, and delete your personal information. You can also object to or restrict our data processing in specific cases. To exercise these rights, please submit a request through our help center. We will respond to your requests in accordance with applicable laws and regulations. Your control over your data is a priority for us.
            </p>
          </div>

          {/* Security Measures */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Security Measures
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement robust security measures to protect your data from unauthorized access, use, or disclosure. These measures include encryption, access controls, and regular security audits. We continually update our security practices to address new threats and vulnerabilities. Your data's security is paramount to us.
            </p>
          </div>

          {/* Compliance */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Compliance
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We comply with all relevant privacy regulations, including the Health Insurance Portability and Accountability Act (HIPAA) and the General Data Protection Regulation (GDPR). Our operations are audited and monitored to ensure we adhere to the strictest standards. By these regulations, we are committed to maintaining the highest standards of privacy and data protection.
            </p>
          </div>

          {/* Contact Us */}
          <div className="p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:support@healthconnect.com" className="text-blue-600 hover:underline">support@healthconnect.com</a>. We are here to address your inquiries and ensure your privacy is protected. Your feedback is valuable as we strive to improve our services and policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;