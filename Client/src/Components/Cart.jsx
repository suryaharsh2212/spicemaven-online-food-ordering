import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Items from './Items';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import { useNavigate } from 'react-router-dom';
function Cart() {
  const items = useSelector((state) => state.cart.items);
  const id=useSelector((state)=> state.user.id)
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const navigate=useNavigate()
  useEffect(() => {
    const calculatedTotal = items.reduce((accumulator, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return accumulator + price * quantity;
    }, 0);

    setTotalPrice(calculatedTotal);
    setFinalPrice(calculatedTotal);
  }, [items]);

  const applyDiscount = () => {
    if (discount === 'SURYA100') {
      setFinalPrice(totalPrice - 0.20 * totalPrice);
      toast('Coupan Applied', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    } else {
      toast.error('Coupon not Valid', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      setFinalPrice(totalPrice);
    }
  };
  const GotoMaps=()=>{
    if(items.length>=1)
    {
      navigate(`/user/restro/${id}/location`)
    }
    else{
      toast.error('Cart is empty', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
      
  }

  return (
    <div className="cart">
      <div className="container mx-auto mt-5">
        <div className="sm:flex shadow-md my-10">
          <Items />

          <div id="summary" className="w-full sm:w-1/4 md:w-1/2 md:-mt-10 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">Items {items.length}</span>
              <span className="font-semibold text-sm">₹{totalPrice.toFixed(2)}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">Mode</label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Delivery</option>
              </select>
            </div>
            <div className="py-10">
              <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Enter your code"
                className="p-2 text-sm w-full border border-solid border-black"
              />
            </div>
            <button onClick={applyDiscount} className="bg-gray-100 text-black hover:bg-gray-200 px-5 py-2 text-sm  uppercase">
              Apply
            </button>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>₹{finalPrice.toFixed(2)}</span>
              </div>
              <button onClick={GotoMaps} className="bg-orange-500 font-semibold hover:bg-orange-600 py-3 text-sm text-white uppercase w-full">
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce/>
    </div>
  );
}

export default Cart;
