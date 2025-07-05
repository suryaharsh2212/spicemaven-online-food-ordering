import React, { useState } from 'react';
import Map from './Map';
import { useDispatch, useSelector } from 'react-redux';
import { UseGenerateOrder } from '../hooks/useGenerateorder';
import { clearCart } from '../redux/cartslice';
import { ToastContainer, toast, Flip, Bounce } from 'react-toastify';
import RazorpayButton from './Payment';

function Finalizedetail() {
    const cart = useSelector((state) => state.cart.items);
    const userDetails = useSelector((state) => state.user.id);
    const total = useSelector((state) => state.user.totalprice);
    const [addresses, setAddresses] = React.useState([]);
    const [spinner, setSpinner] = useState(false)
    const [locater, setLocater] = useState(false)
    const [lat, setLat] = React.useState('');
    const [long, setLong] = React.useState('');
    const [token, setToken] = React.useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const dispatch = useDispatch();
    const [paymentStartController, setpaymentStartController] = useState(false);
    const handleSelectChange = (e) => {
        setSelectedAddress(e.target.value);
      
    };

    const GenerateOrder = async () => {
        setSpinner(true);

        const orderObject = {
            userID: userDetails,
            address: selectedAddress,
            totalAmount: total,
            orderDetails: cart.map(item => ({
                dishId: item._id,
                quantity: item.quantity,
            })),
        };

        try {
            const response = await UseGenerateOrder(orderObject);

            if (response.slag && response?.existingOrder?.status === 'preparing' || response?.existingOrder?.status === 'packed' || response?.existingOrder?.status === 'outForDelivery') {
                toast.error(" You already have a pending order. Please wait until it is completed.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
                alert("You already have a pending order. Please wait until it is completed.");
                setSpinner(false);
                return;
            }

            console.log("Order generated successfully:", response);
            localStorage.setItem("orderId", response?.order?._id);
            console.log("Order ID stored in localStorage:", response?.order?._id);
            setToken(response?.order?._id);
            if(response?.order?._id){
                setpaymentStartController(false);
            }

            setpaymentStartController(true);

            dispatch(clearCart());

        } catch (error) {
            console.error("Error during order generation:", error);
            toast.error("Something went wrong while placing your order.");
        }

        setSpinner(false);
    };


    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLong(longitude);
    });

    React.useEffect(() => {
        setLocater(true)
        const fetchAddressSuggestions = async () => {
            const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${long}&api_key=RXOAN8qwwE5Ze8YTC6xUN9oM5xg90wvETPTct8Gb`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-Request-Id': '',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                if (data.results && Array.isArray(data.results)) {
                    const addresses = data.results.map(result => result.formatted_address);
                    setAddresses(addresses);
                    setLocater(false)
                } else {
                    console.log('No results found or incorrect data structure.');
                    setLocater(false)
                }
            } catch (error) {
                setLocater(false)
                console.error('Fetch error:', error);
            }
        };

        fetchAddressSuggestions();
    }, [lat, long]);


    return (
        <div className='mt-10 h-screen '>

            {paymentStartController && token ?
                <div className="flex mt-4 items-center justify-center">
                    <RazorpayButton amount={total} />
                </div>
                :
                <div className="container mx-auto px-4 py-6 lg:px-8">
                    {locater ? <><span className="loader "></span> <span>Locating you.....</span></> : <></>}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="col-span-2 bg-gray-200 h-64 md:h-full lg:h-auto">
                            <Map />
                        </div>
                        <div className=" p-4 h-full">
                            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-1 lg:p-12">
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800">Confirm Your Order</h2>
                                    <p className="text-gray-600">Please confirm your address and provide any delivery instructions.</p>
                                    <div className="w-full border rounded-lg border-gray">
                                        <select value={selectedAddress} onChange={handleSelectChange} className="select border-gray w-full max-w-full">
                                            <option disabled selected>
                                                Confirm your address
                                            </option>
                                            {addresses.length > 0 ? (
                                                addresses.map((address, index) => (
                                                    <option key={index} className="hover:scale-110">
                                                        {address}
                                                    </option>
                                                ))
                                            ) : (
                                                <option>No addresses found.</option>
                                            )}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="sr-only" htmlFor="message">Message</label>
                                        <textarea
                                            className="w-full rounded-lg border border-gray p-3 text-sm"
                                            placeholder="Write some Delivery Instruction so that we can reach you easily"
                                            rows="8"
                                            id="message"
                                        ></textarea>
                                    </div>

                                    <div className="mt-4 flex w-full">
                                        <button
                                            onClick={GenerateOrder}
                                            className="w-full rounded-lg bg-orange-500 px-5 py-3 font-medium text-white"
                                        >
                                            {spinner
                                                ? <div className='flex justify-center'><img className="w-7 h-7 animate-spin " src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon" />Generating your Order</div>
                                                : <>Proceed</>
                                            }
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Flip}
            />
        </div>
    );

}

export default Finalizedetail;
