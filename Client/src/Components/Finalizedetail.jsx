import React from 'react';
import Map from './Map';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { UseGenerateOrder } from '../hooks/useGenerateorder';
import { clearCart } from '../redux/cartslice';
function Finalizedetail() {
    const cart = useSelector((state) => state.cart.items);
    const userDetails=useSelector((state)=> state.user.id)
    const [addresses, setAddresses] = React.useState([]);
    const [lat, setLat] = React.useState('')
    const [long, setLong] = React.useState('')
    const dispatch=useDispatch()
    console.log(userDetails);

const navigate=useNavigate();
    const GenerateOrder=async()=>{

       
        const orderObject = {
            userID: userDetails,
            orderDetails: cart.map(item => ({
              dishId: item._id, 
              quantity: item.quantity
            }))
          };
          console.log("Order Genetrated",orderObject);
        // after getting sucess response from the backend with navigate to next page
     
        const response=await UseGenerateOrder(orderObject)
        console.log(response);
        dispatch(clearCart())
        
        navigate(`/user/restro/${userDetails}/confirmOrder`) 
          
          

    }
   

 

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude)
        setLong(longitude)
    })
    
    
 
   
    React.useEffect(() => {
        const fetchAddressSuggestions = async () => {
            const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${long}&api_key=RXOAN8qwwE5Ze8YTC6xUN9oM5xg90wvETPTct8Gb`;
            const requestId = '';

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-Request-Id': requestId,
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                if (data.results && Array.isArray(data.results)) {
                    
                    const addresses = data.results.map(result => result.formatted_address);
                    setAddresses(addresses);
                } else {
                    console.log('No results found or incorrect data structure.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchAddressSuggestions();
    }, [lat, long]);


    return (
        <div>
            <section className="bg-gray-100">
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                        {/* Map section */}
                        <div className="lg:col-span-3 lg:py-12">
                            <h1 className='-mt-10 relative font-semibold text-lg' >

                                <label
                                    htmlFor="Option1"
                                    className="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
                                >
                                    <div className="flex items-center">
                                        &#8203;
                                        <input type="checkbox" className="size-4 rounded border-gray-300" id="Option1" />
                                    </div>

                                    <div>
                                        <strong className="font-medium text-gray-900"> Locate </strong>

                                        {/* <p className="mt-1 text-pretty text-sm text-gray-700">
                                            Is Your Location correct Help us so that we can reach you.
                                        </p> */}
                                    </div>
                                </label>


                            </h1>
                            <div className="w-full h-64 sm:h-80 md:h-96 lg:h-full overflow-hidden rounded-lg">
                                <Map />

                            </div>

                        </div>

                        {/* Form section */}
                        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-2 lg:p-12">
                            <div  className="space-y-4">
                                <div className="bg-gray-600 px-4 py-3 text-white">
                                    <p className="text-center text-sm font-medium">
                                        Give your more Details

                                    </p>
                                </div>
                                <div>
                                    <label className="sr-only" htmlFor="name">Name</label>
                                    <input
                                        className="w-full rounded-lg border border-gray p-3 text-sm"
                                        placeholder="Name"
                                        type="text"
                                        id="name"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="sr-only" htmlFor="email">Email</label>
                                        <input
                                            className="w-full rounded-lg border border-gray p-3 text-sm"
                                            placeholder="Email address"
                                            type="email"
                                            id="email"
                                        />
                                    </div>

                                    <div>
                                        <label className="sr-only" htmlFor="phone">Phone</label>
                                        <input
                                            className="w-full rounded-lg border border-gray p-3 text-sm"
                                            placeholder="Phone Number"
                                            type="tel"
                                            id="phone"
                                        />
                                    </div>
                                  
                                </div>
                                <div className='w-full border rounded-lg border-gray'>
                                   <select className="select border-gray w-full max-w-full">
                                        <option disabled selected ><span className='text-gray'>Confirm your address</span></option>
                                        {addresses.length > 0 ? (
                                            addresses.map((address, index) => (
                                                <option className=' hover:scale-110' key={index}>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{address}</td>
                                                </option>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700" colSpan="1">
                                                    No addresses found.
                                                </td>
                                            </tr>
                                        )}
                                    </select>
                                   </div>




                                <div>
                                    <label className="sr-only" htmlFor="message">Message</label>
                                    <textarea
                                        className="w-full rounded-lg border border-gray p-3 text-sm"
                                        placeholder="Write some Delivery Instruction so that we can reach to you easily"
                                        rows="8"
                                        id="message"
                                    ></textarea>
                                </div>

                                <div className="mt-4">
                                    <button
                                        onClick={GenerateOrder}
                                        className="inline-block w-full rounded-lg bg-orange-500  px-5 py-3 font-medium text-white sm:w-auto"
                                    >
                                        PlaceOrder
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Finalizedetail;

// sample input for backend 
// {
//     "userID": "60c72b2f9b1d4f1a4c8b4567",
//     "orderDetails": [
//       {
//         "dishId": "60c72b2f9b1d4f1a4c8b4568",
//         "quantity": 2
//       },
//       {
//         "dishId": "60c72b2f9b1d4f1a4c8b4569",
//         "quantity": 1
//       }
//     ]
//   }