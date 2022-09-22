import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import usePosition from '../hooks/usePosition'
import MarkerIcon from '../assets/icons/marker.png'
import LoadingSpinner from '../components/LoadingSpinner'


const Map = () => {
  const [currentPosition, setCurrentPosition] = useState();
  const [currentZoom, setCurrentZoom] = useState(2);
  const position = usePosition();
  const [marker, setMarker] = useState(false);
  const [ libraries ] = useState(['places']);
  const [searchBox, setSearchBox] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const containerStyle = {
    width: '100%',
    height: '500px'
  };

  const inputStyle = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    position: 'absolute',
    top: '10px',
    right: '10px',
  }
  const onLoad = ref => setSearchBox(ref);

  const onPlacesChanged = () => {
    console.log('places', searchBox.getPlaces())
    const places = searchBox.getPlaces();
    places.forEach(place => {
      setCurrentPosition(place.geometry.location)
    })
  }



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
      {!isLoaded && <LoadingSpinner/>}
      {isLoaded && <GoogleMap
        mapContainerStyle={containerStyle}
        defaultCenter={{ lat: 55.606, lng: 13.021 }}
        center={currentPosition}
        zoom={currentZoom}
      >       
     {marker && <Marker position={currentPosition} icon={MarkerIcon}/> }
 
        { /* Child components, such as markers, info windows, etc. */ }
        <StandaloneSearchBox   onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
            <input
              type='text'
              placeholder='Search location'
              style={inputStyle}
            />
          </StandaloneSearchBox>
      </GoogleMap>}
      </>
  )
}

export default Map
