import React from 'react';
import { AlertTriangle } from 'lucide-react';

const TestModeBanner = () => {
  return (
    <div className="w-full bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-md flex items-start sm:items-center gap-3 shadow-md">
      <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
      <div className="text-sm sm:text-base leading-snug">
        <strong className="font-semibold">Test Mode:</strong> This website is running in test mode. Payments are simulated and no real transactions will occur. Orders may appear to be created, but they will not be processed or delivered.
      </div>
    </div>
  );
};

export default TestModeBanner;
