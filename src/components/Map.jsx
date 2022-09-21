import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 55.606,
  lng: 13.021
};
const api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const Map = () => {
  return (
    <LoadScript
      googleMapsApiKey={api_key}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default Map