import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UseOrderStatus } from '../hooks/Useorderstatus';
import CountdownTimer from '../assets/CountDownTimer';
import { Link, useNavigate } from 'react-router-dom';

function Order_confo() {
    const userId = useSelector((state) => state.user.id);
    const [order, setOrder] = useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await UseOrderStatus(userId);
                if (response) {
                    setOrder(response);
                } else {
                    console.log('No order details found.');
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };
        fetchOrder();
    }, [userId]);
    const backtoMenu=()=>{
     
  navigate(`/user/restro/${userId}`)
    }

    return (
        <div className="container w-full h-full mx-auto p-4 md:p-10">
            <h2 className="text-sm   font-bold mb-4"> <button onClick={backtoMenu} className='flex '><span className='bg-slate-200 btn'>Back to menu </span><span> <img className='h-5 ml-2 mt-4   w-7' src="https://cdn-icons-png.flaticon.com/128/3916/3916800.png" alt="" /></span></button></h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {order && order.length > 0 ? (
                    order.map((orderItem) => (
                        <div key={orderItem._id} className="w-full mb-4">
                            <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
                                <div className="flex flex-col sm:flex-row items-start sm:gap-8">
                                    <div>
                                        <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
                                            Status: {orderItem.status}
                                        </strong>
                                        <h3 className="mt-4 text-lg font-medium sm:text-xl">
                                            <button className="hover:underline">Order ID: {orderItem._id}</button>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-700">
                                            {new Date(orderItem.date).toLocaleDateString()}
                                        </p>
                                        <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                                            <div className="flex items-center gap-1 text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                <p className="text-xs font-medium"><CountdownTimer /></p>
                                            </div>
                                            <span className="hidden sm:block" aria-hidden="true">&middot;</span>
                                            <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                                                Featuring Spice Haven
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <ul>
                                    {orderItem.details.map((detail) => (
                                        <div key={detail._id} className="flow-root rounded-lg border mt-2 border-gray-100 py-3 shadow-sm">
                                            <li className="text-sm p-2 text-gray-700 flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <img className='w-20 h-20 rounded-xl mr-2' src={detail.dish.image} alt="error" />
                                                    <span className='font-bold text-orange-950 ml-2 text-sm'>{detail.dish.name}</span>
                                                </div>
                                                <span className='font-medium text-sm mr-4'>Quantity - {detail.quantity}</span>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </article>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-screen bg-white">
                        <div className="text-center">
                            <h1 className="text-9xl font-black text-gray-200">404</h1>
                            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Oops!</p>
                            <p className="mt-4 text-gray-500">We can't find any order from your side.</p>
                            <Link
                                to={`/user/restro/${userId}`}
                                className="mt-6 inline-block rounded bg-orange-500 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                            >
                                Order Something
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Order_confo;
