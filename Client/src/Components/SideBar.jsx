import React from 'react';

function SideBar({ onSelectType }) {
    return (
        <div className='md:bg-white'>
            <ul className="flex space-x-2 p-3 overflow-x-auto w-full scrollbar-hidden md:block ">
                <li className="flex-shrink-0 md:ml-2 ">
                    <button
                        onClick={() => onSelectType("Starters")}
                        className="flex items-center gap-3 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700 whitespace-nowrap"
                    >
                        <img
                            className='h-5 w-5'
                            src="https://cdn-icons-png.flaticon.com/128/6349/6349709.png"
                            alt="Starters"
                        />
                        <span className="text-sm font-medium">Starters</span>
                    </button>
                </li>
                <li className="flex-shrink-0">
                    <button
                        onClick={() => onSelectType("Veg Gravy")}
                        className="flex items-center gap-3 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700 whitespace-nowrap"
                    >
                        <img
                            className='h-5 w-5'
                            src="https://cdn-icons-png.flaticon.com/128/5074/5074319.png"
                            alt="Veg Gravy"
                        />
                        <span className="text-sm font-medium">Veg Gravy</span>
                    </button>
                </li>
                <li className="flex-shrink-0">
                    <button
                        onClick={() => onSelectType("Non-Veg Gravy")}
                        className="flex items-center gap-3 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700 whitespace-nowrap"
                    >
                        <img
                            className='h-5 w-5'
                            src="https://cdn-icons-png.flaticon.com/128/10473/10473041.png"
                            alt="Non-Veg Gravy"
                        />
                        <span className="text-sm font-medium">Non-Veg Gravy</span>
                    </button>
                </li>
                <li className="flex-shrink-0">
                    <button
                        onClick={() => onSelectType("Chinese")}
                        className="flex items-center gap-3 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700 whitespace-nowrap"
                    >
                        <img
                            className='h-5 w-5'
                            src="https://cdn-icons-png.flaticon.com/128/10472/10472694.png"
                            alt="Chinese"
                        />
                        <span className="text-sm font-medium">Chinese</span>
                    </button>
                </li>
                <li className="flex-shrink-0">
                    <button
                        onClick={() => onSelectType("Drink & Beverages")}
                        className="flex items-center gap-3 rounded-lg hover:bg-gray-100 px-4 py-2 text-gray-700 whitespace-nowrap"
                    >
                        <img
                            className='h-5 w-5'
                            src="https://cdn-icons-png.flaticon.com/128/5529/5529097.png"
                            alt="Drink & Beverages"
                        />
                        <span className="text-sm font-medium">Drink & Beverages</span>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
