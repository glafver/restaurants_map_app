import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import usePosition from '../hooks/usePosition'
import MarkerIcon from '../assets/icons/marker.png'


const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 55.606, lng:  13.021 });
  const [currentZoom, setCurrentZoom] = useState(2);
  const position = usePosition();
  const [marker, setMarker] = useState(false);
  const api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const containerStyle = {
    width: '100%',
    height: '500px'
  };

  useEffect(() => {
    console.log(position);
    if (position.latitude && position.longitude && !position.error) {
      setCurrentPosition({ lat: position.latitude, lng: position.longitude });
      setCurrentZoom(14);
      setMarker(true)
    }
  }, [position.latitude, position.longitude, position.error, marker]);

  return (
  <>
      {isLoaded && <GoogleMap
        mapContainerStyle={containerStyle}
        defaultCenter={{ lat: 55.606, lng: 13.021 }}
        center={currentPosition}
        zoom={currentZoom}
      >       
     {marker && <Marker position={currentPosition} icon={MarkerIcon}/> }
      
        { /* Child components, such as markers, info windows, etc. */ }
        
      </GoogleMap>}
      </>
  )
}

export default Map
