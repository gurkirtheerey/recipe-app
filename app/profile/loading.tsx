import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 animate-pulse"></div>
        </div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">Loading your profile...</p>
      <p className="mt-2 text-sm text-gray-500">Please wait a moment</p>
    </div>
  );
};

export default Loading;
