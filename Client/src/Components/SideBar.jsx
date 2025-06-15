import React from 'react';
import {
  UtensilsCrossed,
  Leaf,
  Drumstick,
  Soup,
  CupSoda
} from 'lucide-react';

function SideBar({ onSelectType }) {
  const menuItems = [
    { label: "Starters", icon: UtensilsCrossed, color: "text-yellow-600" },
    { label: "Veg Gravy", icon: Leaf, color: "text-green-600" },
    { label: "Non-Veg Gravy", icon: Drumstick, color: "text-red-500" },
    { label: "Chinese", icon: Soup, color: "text-orange-500" },
    { label: "Drink & Beverages", icon: CupSoda, color: "text-blue-500" },
  ];

  return (
    <div className="bg-white md:bg-transparent -mt-5">
      <ul className="flex overflow-x-auto md:flex-col md:space-y-2 space-x-2 md:space-x-0 px-2 py-2 scrollbar-hidden">
        {menuItems.map(({ label, icon: Icon, color }) => (
          <li key={label} className="flex-shrink-0">
            <button
              onClick={() => onSelectType(label)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 whitespace-nowrap transition w-full"
            >
              <Icon className={`w-5 h-5 ${color}`} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
