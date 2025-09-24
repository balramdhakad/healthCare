import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Footer from '../../components/Footer';


const AccordionSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-5 text-left font-semibold text-lg text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <FaChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="pb-5 text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

const TermsOfService = () => {
  return (
    <>
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center mb-2">
          Terms of Service
        </h1>
        <p className="text-center text-sm text-gray-500 mb-12">
          Last updated: October 26, 2025
        </p>

        <div className="space-y-6">
          <AccordionSection title="1. Acceptance of Terms">
            <p>
              By accessing or using the HealthConnect platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms are subject to change at our discretion.
            </p>
          </AccordionSection>

          <AccordionSection title="2. User Responsibilities and Conduct">
            <p>
              Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to provide accurate and complete information when registering and using the platform.
            </p>
            <p className="mt-4">
              You must use HealthConnect only for lawful purposes and in a manner that does not infringe upon the rights of, restrict, or inhibit anyone else's use and enjoyment of the platform. Prohibited behavior includes harassing or causing distress or inconvenience to any user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our platform.
            </p>
          </AccordionSection>

          <AccordionSection title="3. Doctor and Patient Conduct">
            <p>
              **For Doctors:** You must maintain all professional licenses and certifications. You agree to provide accurate, ethical, and compassionate medical care. You must not use the platform for any illegal activities or to prescribe controlled substances without a valid in-person consultation as required by law.
            </p>
            <p className="mt-4">
              **For Patients:** You agree to provide truthful and complete information to your healthcare providers. The platform is not for medical emergencies. In case of an emergency, please contact your local emergency services immediately.
            </p>
          </AccordionSection>

          <AccordionSection title="4. Intellectual Property">
            <p>
              All content on the HealthConnect platform, including text, graphics, logos, and software, is the property of HealthConnect or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
            </p>
          </AccordionSection>

          <AccordionSection title="5. Disclaimers and Limitation of Liability">
            <p>
              The HealthConnect platform is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the operation or availability of the platform, or the information, content, materials, or products included on the platform. We do not warrant that the platform will be uninterrupted or error-free.
            </p>
            <p className="mt-4">
              In no event shall HealthConnect be liable for any damages, including, but not limited to, direct, indirect, incidental, punitive, and consequential damages, arising out of or in connection with the use or inability to use the platform, even if we have been advised of the possibility of such damages.
            </p>
          </AccordionSection>

          <AccordionSection title="6. Privacy Policy and Data Usage">
            <p>
              Your use of the HealthConnect platform is also governed by our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>, which is incorporated herein by reference. Please review our Privacy Policy to understand our practices regarding your personal information, including how we collect, use, and disclose your data.
            </p>
          </AccordionSection>

          <AccordionSection title="7. Dispute Resolution">
            <p>
              Any disputes arising out of or relating to these Terms of Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in San Francisco, California, and the decision of the arbitrator shall be final and binding.
            </p>
          </AccordionSection>

          <AccordionSection title="8. Changes to Terms">
            <p>
              HealthConnect reserves the right to modify these Terms of Service at any time. We will notify users of any significant changes by posting the new terms on our platform. Your continued use of the platform after such changes constitutes your acceptance of the new terms.
            </p>
          </AccordionSection>

          <AccordionSection title="9. Contact Us">
            <p>
              If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@healthconnect.com" className="text-blue-600 hover:underline">support@healthconnect.com</a>.
            </p>
          </AccordionSection>
        </div>
      </div>
    </div>
      </>
  );
};

export default TermsOfService;