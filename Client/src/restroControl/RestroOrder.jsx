import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_URL from '../Utility/constant';
import { RefreshCw, PackageX } from 'lucide-react';
import Ably from 'ably';

function RestroOrder() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptingOrders, setAcceptingOrders] = useState(true);


  const ably = new Ably.Realtime({ key: 'D3oMJQ.KLXXSg:fF4sPNms7-Fusun_3tsOPg0K1LWPryvPoL9dahM15qA' });
  const channel = ably.channels.get('restaurant-status');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/restro/order/today`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
        console.warn('Unexpected response:', data);
      }
    } catch (err) {
      console.error('Fetch failed:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async () => {
    try {
      const response = await fetch(`${API_URL}/restro/order/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: selectedOrder._id,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!data.error) {
        setOrders(prev =>
          prev.map(order =>
            order._id === selectedOrder._id ? { ...order, status: newStatus } : order
          )
        );
        setModalOpen(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const toggleRestaurantStatus = () => {
    const newStatus = !acceptingOrders;
    setAcceptingOrders(newStatus);

    channel.publish('status-change', { acceptingOrders: newStatus }, (err) => {
      if (err) {
        console.error('Ably publish error:', err);
      } else {
        console.log('Status updated:', newStatus);
      }
    });
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 px-4">
        <h2 className="text-2xl font-bold text-center md:text-left">Today's Orders</h2>

        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <button
            onClick={toggleRestaurantStatus}
            className={`px-4 py-2 rounded text-white font-semibold transition ${acceptingOrders ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
          >
            {acceptingOrders ? ' Accepting Orders' : ' Not Accepting Orders'}
          </button>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className={`flex items-center gap-2 text-sm px-4 py-2 rounded shadow transition ${loading ? 'bg-gray-300 cursor-not-allowed text-gray-700' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refresh...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {!orders.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-600">
          <div className="bg-orange-100 p-6 rounded-full shadow-sm mb-4">
            <PackageX className="w-12 h-12 text-orange-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-1">No Orders Yet</h3>
          <p className="text-sm text-gray-500">Looks like there are no orders placed today. Please check back later or refresh the page.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {orders.map(order => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md cursor-pointer space-y-4"
              onClick={() => {
                setSelectedOrder(order);
                setNewStatus(order.status);
                setModalOpen(true);
              }}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm text-gray-700">Order ID:</span>
                <span className="text-xs text-gray-500">{order._id}</span>
              </div>

              <div className="text-sm text-gray-600">
                <p>Status: <span className="font-semibold text-orange-600 capitalize">{order.status}</span></p>
                <p>Time: {new Date(order.createdAt).toLocaleTimeString()}</p>
              </div>

              <div className="border-t pt-2 space-y-3">
                {order.details.map(item => (
                  <div key={item._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{item.dish.name}</h4>
                        <p className="text-xs text-gray-500">{item.dish.section}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${item.dish.vegetarian === "true"
                          ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {item.dish.vegetarian === "true" ? 'Vegetarian' : 'Non-Vegetarian'}
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-700 font-medium">Qty: {item.quantity}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-[90%] md:w-[600px] p-6 rounded-xl shadow-xl relative"
            >
              <button
                className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>

              <h3 className="text-xl font-semibold mb-2">🍽️ Order Details</h3>
              <p className="text-sm text-gray-500 mb-4">Order ID: {selectedOrder._id}</p>

              <ul className="divide-y">
                {selectedOrder.details.map(item => (
                  <li key={item._id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.dish.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Change Status:
                </label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value)}
                >
                  <option value="preparing">Preparing</option>
                  <option value="packed">Packed</option>
                  <option value="outForDelivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button
                  onClick={handleStatusChange}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
                >
                  Update Status
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RestroOrder;


