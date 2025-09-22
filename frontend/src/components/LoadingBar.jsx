import React from 'react';

const LoadingBar = () => {
  return (
    <div className="w-full max-w-xl mx-auto mt-20">
      <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">Loading...</h2>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">

        <div 
          className="bg-blue-600 h-2.5 rounded-full animate-pulse transition-all duration-1000 ease-in-out"
          style={{ width: '100%' }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingBar;