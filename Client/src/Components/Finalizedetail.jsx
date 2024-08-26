import React, { useState } from 'react';
import Map from './Map';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UseGenerateOrder } from '../hooks/useGenerateorder';
import { clearCart } from '../redux/cartslice';

function Finalizedetail() {
    const cart = useSelector((state) => state.cart.items);
    const userDetails = useSelector((state) => state.user.id);
    const [addresses, setAddresses] = React.useState([]);
    const [spinner,setSpinner]=useState(false)
    const [locater,setLocater]=useState(false)
    const [lat, setLat] = React.useState('');
    const [long, setLong] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const GenerateOrder = async () => {
        setSpinner(true)
        const orderObject = {
            userID: userDetails,
            orderDetails: cart.map(item => ({
                dishId: item._id,
                quantity: item.quantity,
            })),
        };
        const response = await UseGenerateOrder(orderObject);
        dispatch(clearCart());
        setSpinner(false)
        navigate(`/user/restro/${userDetails}/confirmOrder`);
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
             
            <div className="container mx-auto px-4 py-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {locater?  <><span className="loader "></span> <span>Locating you.....</span></> :<></>}
                    <div className="col-span-2 bg-gray-200 h-64 md:h-full lg:h-auto">
                 
                        <Map />
                    </div>
                    <div className=" p-4 h-full">
                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-1 lg:p-12">
                            <div className="space-y-4">
                                {/* <div className="bg-gray-600 px-4 py-3 text-white">
                                    <p className="text-center text-sm font-medium">
                                        Confirm your Address
                                    </p>
                                </div> */}
    
                                <div className="w-full border rounded-lg border-gray">
                                    <select className="select border-gray w-full max-w-full">
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
                    : <>Place Order</>
                  }
                                    </button>
                                </div>
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Finalizedetail;
