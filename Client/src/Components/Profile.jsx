import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UseOrderStatus } from '../hooks/Useorderstatus';

function Profile() {
  const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);

  const GotoMenu = () => {
    navigate(`/user/restro/${user.id}`);
  };

  useEffect(() => {
    const getOrder = async () => {
      const res = await UseOrderStatus(userId);
      console.log(res);
      setOrder(res);
    };
    getOrder();
  }, [userId]);

  return (
    <div className='flex items-start h-full'>
      <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm md:p-40">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">UniqueId</dt>
            <dd className="text-gray-700 sm:col-span-2">{user.id}</dd>
          </div>

          <div className="grid grid-cols-1  gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Name</dt>
            <dd className="text-gray-700 sm:col-span-2">{user.name}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Email</dt>
            <dd className="text-gray-700 sm:col-span-2">{user.email}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">PhoneNo</dt>
            <dd className="text-gray-700 sm:col-span-2">{user.phoneNo}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Orders</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {order && order.length > 0 ? (
                <div>
                  {order.map((orderItem) => (
                    <div key={orderItem._id} className="mb-4">
                      <h3 className="font-semibold text-gray-800">Order ID: {orderItem._id}</h3>
                      <p className="text-sm text-gray-600">Status: {orderItem.status}</p>
                      <p className="text-sm text-gray-600">Date: {new Date(orderItem.date).toLocaleDateString()}</p>
                      <h4 className="font-medium mt-2">Dishes:</h4>
                      <ul>
                        {orderItem.details.map((detail) => (
                          <li key={detail._id} className="text-sm text-gray-700">
                            {detail.dish.name} - Quantity: {detail.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No orders found.</p>
              )}
            </dd>
          </div>

          <div className="gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <button onClick={GotoMenu} className='w-full btn bg-orange-400 hover:bg-orange-600 text-white'>
              Back to menu
            </button>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Profile;
