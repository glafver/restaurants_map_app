import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import usePosition from '../hooks/usePosition'
import UserIcon from '../assets/icons/user.png'
import RestaurantIcon from '../assets/icons/restaurant.png'

const RestaurantMap = ({ restaurantGeolocation }) => {
  const [libraries] = useState(['places', 'geometry']);
  const [currentZoom, setCurrentZoom] = useState(12);

  const [myPosition, setMyPosition] = useState();
  const position = usePosition();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const containerStyle = {
    // width: '300px',
    height: '100%'
  };

  useEffect(() => {
    if (position.latitude) {
      setMyPosition({ lat: position.latitude, lng: position.longitude })
    }
  }, [position.latitude])


  return (
    <>

      {isLoaded && <GoogleMap
        mapContainerStyle={containerStyle}
        center={restaurantGeolocation}
        zoom={currentZoom}
      >

        {myPosition && <Marker position={myPosition} icon={UserIcon} />}

        {restaurantGeolocation && <Marker position={restaurantGeolocation} icon={RestaurantIcon} />}

      </GoogleMap>}
    </>
  )
}

export default RestaurantMap
