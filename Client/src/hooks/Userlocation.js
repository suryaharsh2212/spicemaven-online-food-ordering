async function fetchDirections(sourceLat, sourceLong, destLat, destLong) {
    const url = `https://api.olamaps.io/routing/v1/directions?origin=${sourceLat},${sourceLong}&destination=${destLat},${destLong}&mode=driving&alternatives=false&steps=true&overview=full&language=en&traffic_metadata=false&api_key=RXOAN8qwwE5Ze8YTC6xUN9oM5xg90wvETPTct8Gb`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        
        // return data;
    } catch (error) {
        console.error('Fetch error:', error.message);
        throw error; // Rethrow error for further handling if needed
    }
}
const sourceLat = "12.993103152916301";
const sourceLong = "77.54332622119354";
const destLat ="12.972006793201695";
const destLong = "77.5800850011884";


fetchDirections(sourceLat, sourceLong, destLat, destLong)
  
