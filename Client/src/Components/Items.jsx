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
        const calculatedTotal = cart.reduce((accumulator, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;
            return accumulator + price * quantity;
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
        <div className="w-full sm:w-3/4 bg-white md:-mt-10  px-10 py-10">
            <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">{name}'s Cart</h1>
                <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
            </div>
            {cart.map((item) => (
                <div key={item.uniqueId} className="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t  border-gray-50">
                    <div className="md:w-4/12 2xl:w-1/4 w-full">
                        <img src={item.image} alt={item.name} className="h-40 w-full object-center object-cover md:block hidden" />
                    </div>
                    <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                        <div className="flex items-center justify-between w-full">
                            <p className="text-base font-black leading-none text-gray-800">{item.name}</p>
                            <QuantityControl
                                quantity={item.quantity}
                                onQuantityChange={(newQuantity) => 
                                    dispatch(updateQuantity({ uniqueId: item.uniqueId, quantity: newQuantity }))
                                }
                            />
                        </div>
                        <p className="text-xs leading-3 text-gray-600 pt-2">{item.description}</p>
                        <div className="flex items-center justify-between pt-5">
                            <div className="flex items-center">
                                <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">{item._id}</p>
                                <button onClick={() => deleteFromCart(item.uniqueId)} className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</button>
                            </div>
                            <p className="text-base font-black leading-none text-gray-800">₹{item.price}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="text-right mt-10">
                {/* <h2 className="text-2xl font-semibold">Total Price: ${totalPrice}</h2>  */}
            </div>
            <button onClick={gotoMenu} className="flex font-semibold text-indigo-600 text-sm mt-10">
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue to Menu
            </button>
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
        <div className="flex justify-center items-center px-4 border border-black rounded-md scale-75">
            <button onClick={increment} className="text-xl font-bold px-2 py-1 rounded">+</button>
            <div className="border border-gray-300 border-t-white border-b-white px-4 py-1 bg-white text-gray-800 font-semibold text-lg">{localQuantity}</div>
            <button onClick={decrement} className="text-xl font-bold px-2 py-1 rounded">-</button>
        </div>
    );
};

export default Items;
