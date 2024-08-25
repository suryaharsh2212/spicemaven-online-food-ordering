import React, { useState, useEffect } from 'react';

function AddressSuggestions() {
    const [addresses, setAddresses] = useState([]);
    const [lat,setLat]=useState('')
   const [long,setLong]=useState('')
   
   navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    setLat(latitude)
    setLong(longitude)})
    
    useEffect(() => {
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
                    // Extract formatted addresses
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
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Address</th>
                        {/* You can add more headers here if needed */}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {addresses.length > 0 ? (
                        addresses.map((address, index) => (
                            <tr className=' hover:scale-110' key={index}>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700" colSpan="1">
                                No addresses found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AddressSuggestions;
