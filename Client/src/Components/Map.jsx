import { useEffect, useState } from 'react';
import { OlaMaps } from '../OlaMapsWebSDK/OlaMapsWebSDK/olamaps-js-sdk.es';
import '../OlaMapsWebSDK/OlaMapsWebSDK/style.css';
import AddressSuggestions from './AddressSuggestions';

function Map() {
   const [lat,setLat]=useState('')
   const [long,setLong]=useState('')
  useEffect(() => {
    const olaMaps = new OlaMaps({
      apiKey: 'RXOAN8qwwE5Ze8YTC6xUN9oM5xg90wvETPTct8Gb',
    });

    // Use the Geolocation API to get the user's current position
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLat(latitude)
      setLong(longitude)
   
      // Initialize the map centered at the user's location
      const myMap = olaMaps.init({
        style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json', 
        container: 'map', 
        center: [longitude, latitude], 
        zoom: 15, 
      });

 
      olaMaps
        .addMarker({
          offset: [0, 0], 
          anchor: 'center', 
          color: ['black']
        })
        .setLngLat([longitude, latitude]) 
        .addTo(myMap); 
    });
    
  }, []); 

  return (
    <div className=' mt-0 w-full h-full'>
        
    <div id="map" className='h-full w-full '  >
      {/* The map will render here */}
    </div>
   
    </div>
  );
}

export default Map;
 {/* <AddressSuggestions lat={lat} long={long}/>  */}