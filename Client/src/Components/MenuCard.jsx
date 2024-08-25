import React from 'react';

function MenuCard({ name, link, price, description, onAddToCart }) {
  return (
    <div className='relative'>
      <div className="mt-2 block p-6 h-[400px] w-full md:max-w-xs rounded-lg gap-2 bg-gray-50 hover:shadow-lg">
        <img
          alt="Product"
          src={link}
          className="h-[200px] w-full object-cover rounded-lg"
        />
        <div className="mt-1 flex flex-col justify-between h-full">
          <div>
            {/* Flexbox container for name and price */}
            <div className=" justify-between items-center">
              <h3
                style={{ fontFamily: 'philoprimary' }}
                className="text-lg font-semibold text-gray-900 sm:text-xl truncate"
              >
                {name}
              </h3>
              <span
                style={{ fontFamily: 'Custom' }}
                className="text-lg  text-gray-900"
              >
                ₹{price}
              </span>
            </div>
            <p
              style={{ fontFamily: 'philoprimary' }}
              className="mt-2 h-10 text-gray-600 text-sm line-clamp-2"
            >
              {description}
            </p>
            <button
              type="button"
              onClick={onAddToCart}
              className="mt-4 w-full rounded bg-yellow-500 p-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
