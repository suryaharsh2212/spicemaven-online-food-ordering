import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/cartslice';
import { useNavigate } from 'react-router-dom';
import { setPrice } from '../redux/slice';

function Items() {
    const cart = useSelector((state) => state.cart.items);
    const name = useSelector((state) => state.user.name);
    const userId = useSelector((state) => state.user.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculatedTotal = cart.reduce((acc, item) => {
            return acc + (Number(item.price) || 0) * (Number(item.quantity) || 1);
        }, 0);
        setTotalPrice(calculatedTotal);
        dispatch(setPrice(calculatedTotal));
    }, [cart, dispatch]);

    const deleteFromCart = (uniqueId) => {
        dispatch(removeItem({ uniqueId }));
    };

    const gotoMenu = () => {
        navigate(`/user/restro/${userId}`);
    };

    return (
        <div className="w-full sm:w-3/4 px-4 py-4 bg-white rounded-md shadow-sm">
            <div className="flex justify-between items-center border-b pb-3 mb-3">
                <h1 className="text-lg font-semibold">{name}'s Cart</h1>
                <h2 className="text-sm text-gray-500">{cart.length} item(s)</h2>
            </div>

            {cart.map((item) => (
                <div
                    key={item.uniqueId}
                    className="flex items-center justify-between w-full gap-4 border-t py-4 flex-wrap"
                >
                    <div className="w-24 h-24 flex-shrink-0">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>

        
                    <div className="flex-1 min-w-[140px]">
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-[10px] text-gray-400">{item._id}</p>
                            <button
                                onClick={() => deleteFromCart(item.uniqueId)}
                                className="text-xs text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>

                  
                    <div className="flex flex-col items-end gap-2">
                        <QuantityControl
                            quantity={item.quantity}
                            onQuantityChange={(newQuantity) =>
                                dispatch(updateQuantity({ uniqueId: item.uniqueId, quantity: newQuantity }))
                            }
                        />
                        <p className="text-sm font-bold text-gray-900">₹{item.price}</p>
                    </div>
                </div>
            ))}


            <div className="mt-5">
                <button
                    onClick={gotoMenu}
                    className="flex items-center text-sm text-orange-600 font-medium hover:text-orange-800"
                >
                    <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 448 512">
                        <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continue to Menu
                </button>
            </div>
        </div>
    );
}

const QuantityControl = ({ quantity, onQuantityChange }) => {
    const [localQuantity, setLocalQuantity] = useState(quantity);

    const increment = () => {
        const newQuantity = localQuantity + 1;
        setLocalQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    const decrement = () => {
        const newQuantity = localQuantity > 1 ? localQuantity - 1 : 1;
        setLocalQuantity(newQuantity);
        onQuantityChange(newQuantity);
    };

    return (
        <div className="flex items-center border rounded-md overflow-hidden text-xs bg-white shadow-sm">
            <button
                onClick={decrement}
                className="px-2 py-1 text-gray-700 hover:bg-gray-100"
            >-</button>
            <div className="px-3 py-1 text-gray-800 bg-gray-50">{localQuantity}</div>
            <button
                onClick={increment}
                className="px-2 py-1 text-gray-700 hover:bg-gray-100"
            >+</button>
        </div>
    );
};

export default Items;
