import React from 'react';
import {
  CheckCircle,
  Clock,
  Package,
  Truck,
  CheckCheck
} from 'lucide-react';

const steps = [
  { key: 'preparing', label: 'Preparing', icon: Clock },
  { key: 'packed', label: 'Packed', icon: Package },
  { key: 'outForDelivery', label: 'Out for Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCheck },
];

const OrderTimeline = ({ currentStatus }) => {
  const currentIndex = steps.findIndex(step => step.key === currentStatus);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.key} className="flex items-start md:items-center gap-3">
            <div className={`rounded-full p-2 border-2 transition-all duration-300
              ${isCurrent ? 'border-orange-600 bg-orange-100' : isActive ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-gray-100'}
            `}>
              <Icon
                className={`h-5 w-5 transition-colors
                  ${isCurrent ? 'text-orange-600' : isActive ? 'text-green-600' : 'text-gray-400'}
                `}
              />
            </div>

    
            <div>
              <h4 className={`text-sm font-semibold transition-colors
                ${isCurrent ? 'text-orange-700' : isActive ? 'text-green-700' : 'text-gray-500'}
              `}>
                {step.label}
              </h4>
              {isCurrent && currentStatus !== 'delivered' && (
                <p className="text-xs text-orange-500">In progress...</p>
              )}
              {index < steps.length - 1 && (
                <div className={`ml-3 h-6 border-l-2 
                  ${isActive ? 'border-orange-400' : 'border-gray-200'}`}></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
