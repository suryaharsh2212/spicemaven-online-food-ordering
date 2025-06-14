import React from 'react';
import {
  CheckCircle,
  Clock,
  Package,
  Truck,
  CheckCheck
} from 'lucide-react';
import API_URL from '../Utility/constant';

const steps = [
  { key: 'preparing', label: 'Preparing', icon: Clock },
  { key: 'packed', label: 'Packed', icon: Package },
  { key: 'outForDelivery', label: 'Out for Delivery', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: CheckCheck },
];

const OrderTimeline = ({ currentStatus ,slag,}) => {
  console.log(currentStatus);
  const orderId = localStorage.getItem('orderId');
  const currentIndex = steps.findIndex(step => step.key === currentStatus);
  const confirmDelivery = async () => {
    try {
      const res = await fetch(`${API_URL}/restro/confirm-delivery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Access-Control-Allow-Credentials': true,
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      console.log(data);
      
      if (data.success) {
        alert('Thank you for confirming!');
        
      } else {
        alert('Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      alert('Error confirming delivery.');
    }
  };


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
              {isCurrent && currentStatus !== 'delivered' && !slag && (
                <p className="text-xs text-orange-500">In progress...</p>
              )}
              {index < steps.length - 1 && (
                <div className={`ml-3 h-6 border-l-2 
                  ${isActive ? 'border-orange-400' : 'border-gray-400'}`}></div>
              )}
            </div>
           

          </div>
        );
      })}
      {currentStatus === 'delivered' && !slag && (
        <div className="flex flex-col items-center gap-2 text-green-600">
          <h1>Have you received your order? </h1>
          <button
            onClick={confirmDelivery}
            className="mt-4 bg-orange-500 z-20 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Confirm Delivery
          </button>
        </div>
      )}

    </div>
  );
};

export default OrderTimeline;
