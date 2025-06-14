import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API_URL from '../Utility/constant';
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
      const response = await fetch(`${API_URL}/restro/showpreviousorder`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userID: userId }),
      });

      const data = await response.json();
      setOrder(data);
    };
    getOrder();
  }, [userId]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 px-4 py-10">
      <div className="w-full max-w-5xl h-full bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
          <button
            onClick={GotoMenu}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
          >
            Back to Menu
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-50 p-5 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Unique ID</h3>
            <p className="text-gray-600">{user.id}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Name</h3>
            <p className="text-gray-600">{user.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Email</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Phone Number</h3>
            <p className="text-gray-600">{user.phoneNo}</p>
          </div>

        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4"> Previous Orders</h2>
          {order && order.length > 0 ? (
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {order.map((orderItem) => (
                <div key={orderItem._id} className="p-4 border rounded-lg bg-gray-50 hover:shadow-md transition">
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-bold text-gray-800">Order ID: {orderItem._id}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${orderItem.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                      {orderItem.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Date: {new Date(orderItem.date).toLocaleDateString()}</p>

                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Dishes:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {orderItem.details.map((detail) => (
                        <li key={detail._id} className="text-sm text-gray-700">
                          {detail.dish.name} - Qty: {detail.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
            </div>
          )}
        </div>


      </div>
    </div>
  );
}

export default Profile;
