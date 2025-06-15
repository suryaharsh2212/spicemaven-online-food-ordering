import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Items from './Items';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useNavigate } from 'react-router-dom';
import { setPrice } from '../redux/slice';
import Ably from 'ably';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.user.id);

  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const ably = new Ably.Realtime({ key: 'D3oMJQ.KLXXSg:fF4sPNms7-Fusun_3tsOPg0K1LWPryvPoL9dahM15qA' });
    const channel = ably.channels.get('restaurant-status');
    const toastId = 'restaurant-status-toast';

    channel.subscribe('status-change', (message) => {
      const { acceptingOrders } = message.data;
      setStatus(acceptingOrders);

      if (!toast.isActive(toastId)) {
        toast.success(
          `Restaurant is now ${acceptingOrders ? 'accepting' : 'not accepting'} orders.`,
          {
            toastId,
            position: 'bottom-center',
            autoClose: 3000,
            theme: 'dark',
            transition: Bounce,
          }
        );
      }
    });

    return () => {
      channel.unsubscribe();
      ably.close();
    };
  }, []);

  useEffect(() => {
    const calculatedTotal = items.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return acc + price * quantity;
    }, 0);

    setTotalPrice(calculatedTotal);
    setFinalPrice(calculatedTotal);
  }, [items]);

  const applyDiscount = () => {
    if (discount === 'SURYA100') {
      const discounted = totalPrice * 0.8;
      setFinalPrice(discounted);
      toast.success('Coupon Applied (20% Off)', {
        position: 'bottom-center',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });
    } else {
      toast.error('Invalid Coupon Code', {
        position: 'bottom-center',
        autoClose: 3000,
        theme: 'dark',
        transition: Bounce,
      });
      setFinalPrice(totalPrice);
    }
  };

  const handleProceed = () => {
    dispatch(setPrice(finalPrice));
    if (items.length >= 1) {
      navigate(`/user/restro/${userId}/location`);
    } else {
      toast.error('Cart is empty', {
        position: 'bottom-center',
        autoClose: 3000,
        theme: 'light',
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Items />
        </div>

        {/* Summary Card */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold border-b pb-3 mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm mb-3">
            <span>Items</span>
            <span>{items.length}</span>
          </div>
          <div className="flex justify-between text-sm mb-3">
            <span>Total</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mode</label>
            <select className="w-full border rounded-md p-2 text-sm bg-white">
              <option>Delivery</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Promo Code</label>
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-full border p-2 text-sm rounded-md"
              placeholder="SURYA100"
            />
            <button
              onClick={applyDiscount}
              className="mt-2 w-full bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium py-2 px-4 rounded text-sm"
            >
              Apply
            </button>
          </div>
          <div className="border-t pt-4 mt-4 text-sm font-semibold flex justify-between">
            <span>Final Total</span>
            <span>₹{finalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleProceed}
            disabled={!status}
            className={`mt-4 w-full py-2 rounded text-white font-semibold text-sm ${
              status ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Proceed
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default Cart;
