import React from 'react';
import { Star, StarHalf } from 'lucide-react'; // or use any star icon you prefer

function MenuCard({ name, link, price, description, rating = 4.5, category = 'Starter', onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden w-full">
      <div className="relative w-full h-48 bg-gray-100">
        <img
          src={link}
          alt={name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-1 left-1 bg-transparent opacity-60 scale-50 text-white text-sm font-medium px-2 py-1 border border-white rounded-full">
          {category}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base text-gray-900">{name}</h3>
          <span className="text-green-600 font-bold text-base">₹{price}</span>
        </div>

        <div className="flex items-center gap-1 mt-1 text-yellow-500 text-sm">
          <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
          <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
          <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
          <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
          <StarHalf className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
          <span className="ml-1 text-gray-600 text-xs">({rating})</span>
        </div>

        <p className="text-xs text-gray-600 mt-2 line-clamp-2 h-8">
          {description}
        </p>

        <button
          onClick={onAddToCart}
          className="mt-4 w-full bg-yellow-500 text-white text-sm font-semibold py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default MenuCard;
