import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

function TestModeBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 shadow-md relative">
      <div className="flex items-start sm:items-center gap-2">
        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 mt-1 sm:mt-0" />
        <strong className="font-semibold text-sm sm:text-base">Test Mode:</strong>
      </div>
      <div className="text-sm sm:text-base leading-snug sm:leading-normal">
        This website is running in test mode. Payments are simulated and no real transactions will occur. Orders may appear to be created, but they will not be processed or delivered.
      </div>
      <button
        className="absolute top-2 right-2 text-yellow-700 hover:text-yellow-900"
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export default TestModeBanner;
