import React from 'react';

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">{title}</h3>
    {children}
  </div>
);

export default Section;