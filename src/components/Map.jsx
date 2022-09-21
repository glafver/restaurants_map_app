import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import usePosition from '../hooks/usePosition'


const Map = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 55.606, lng:  13.021 });
  const [currentZoom, setCurrentZoom] = useState(2);
  const position = usePosition();
  const api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


  const containerStyle = {
    width: '100%',
    height: '500px'
  };

  useEffect(() => {
    console.log(position);
    if (position.latitude && position.longitude && !position.error) {
      setCurrentPosition({ lat: position.latitude, lng: position.longitude });
      setCurrentZoom(13);
    }
  }, [position.latitude, position.longitude, position.error]);

  return (
    <LoadScript
      googleMapsApiKey={api_key}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        defaultCenter={{ lat: 55.606, lng: 13.021 }}
        center={currentPosition}
        zoom={currentZoom}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map