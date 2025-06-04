
const lat=23.503
const long=85.4757

const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${long}&api_key=RXOAN8qwwE5Ze8YTC6xUN9oM5xg90wvETPTct8Gb`;
const requestId = ''; // Replace with your actual request ID

// Perform the fetch request
fetch(url, {
    method: 'GET',
    headers: {
        'X-Request-Id': requestId,
        'Accept': 'application/json' 
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); 
})
.then(data => {
    console.log('Response data:', data.results); 
})
.catch(error => {
    console.error('Fetch error:', error); 
});

  