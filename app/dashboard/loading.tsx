import React from 'react';
import { Utensils } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="flex flex-col items-center">
        {/* Logo and Loading Animation Container */}
        <div className="relative mb-8">
          {/* Outer Circle Pulse */}
          <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-500/10 animate-ping"></div>

          {/* Middle Circle Pulse (slower) */}
          <div className="absolute inset-2 rounded-full bg-blue-500/30 dark:bg-blue-500/20 animate-pulse"></div>

          {/* Inner Content with Logo Icon */}
          <div className="relative w-20 h-20 bg-white dark:bg-gray-950 rounded-full flex items-center justify-center shadow-md dark:shadow-black/50 z-10">
            <Utensils className="w-10 h-10 text-blue-600 dark:text-blue-500" />
          </div>
        </div>

        {/* Text and Progress Dots */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Loading Your Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Preparing your recipes and meal plans...</p>

          {/* Animated Dots */}
          <div className="flex space-x-2 justify-center">
            <div
              className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
