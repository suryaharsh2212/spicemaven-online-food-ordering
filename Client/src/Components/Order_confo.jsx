import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UseOrderStatus } from '../hooks/Useorderstatus';
import CountdownTimer from '../assets/CountDownTimer';
import { useNavigate } from 'react-router-dom';

function Order_confo() {
  const userId = useSelector((state) => state.user.id);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await UseOrderStatus(userId);
        console.log("my res", response);

        if (Array.isArray(response)) {
          setOrder(response);
        } else {
          setApiMessage(response?.message || 'No orders found.');
          setOrder([]);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        setOrder([]);
        setApiMessage('An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [userId]);

  const backtoMenu = () => {
    navigate(`/user/restro/${userId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container w-full h-full mx-auto p-4 md:p-10">
      <h2 className="text-sm font-bold mb-4">
        <button onClick={backtoMenu} className="flex items-center">
          <span className="bg-slate-200 px-4 py-2 rounded hover:bg-slate-300">Back to menu</span>
          <img
            className="h-5 w-7 ml-2 mt-1"
            src="https://cdn-icons-png.flaticon.com/128/3916/3916800.png"
            alt="back"
          />
        </button>
      </h2>

      {Array.isArray(order) && order.length === 0 ? (
        <div className="text-center text-gray-600 text-lg font-medium mt-10">
          {apiMessage || "No orders from your side."}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {order.map((orderItem) => (
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
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Order_confo;
