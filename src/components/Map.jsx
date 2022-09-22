import React, { useState, useEffect} from 'react'
import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import usePosition from '../hooks/usePosition'
import MarkerIcon from '../assets/icons/marker.png'
import LoadingSpinner from '../components/LoadingSpinner'

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState();
  const [currentZoom, setCurrentZoom] = useState(2);
  const position = usePosition();
  const [ libraries ] = useState(['places']);
  const [searchBox, setSearchBox] = useState(null);
  const [myLocation, setMyLocation] = useState(false);

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
    right: '55px',
  }
  const onSearchLoad = ref => setSearchBox(ref);

  const onPlacesChanged = () => {
    setMyLocation(false)
    const places = searchBox.getPlaces();
    places.forEach(place => {
      setCurrentPosition(place.geometry.location)
    })
  }


  const locationButton = document.createElement("button");
  locationButton.textContent = "Go to Your Location";
  locationButton.classList.add("custom-map-control-button");

  const handleMapOnLoad = map => {
    map.controls[google.maps.ControlPosition.BOTTOM].push(locationButton);
  }
    

  locationButton.addEventListener("click", () => {
    setMyLocation(true)
  });
 
  useEffect(()=> {
    if(myLocation){
      setCurrentPosition({ lat: position.latitude, lng: position.longitude });
    }
  }, [myLocation])

  useEffect(() => {
    if (position.latitude && position.longitude && !position.error) {
        setCurrentPosition({ lat: position.latitude, lng: position.longitude });
        setCurrentZoom(14);
    }
  }, [position.latitude, position.longitude, position.error]);


  return (
  <>
      {!isLoaded && <LoadingSpinner/>}
      {isLoaded && <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={currentZoom}
        onLoad={map => handleMapOnLoad(map)}
      >       
     {currentPosition && <Marker position={currentPosition} icon={MarkerIcon}/> }
 
        { /* Child components, such as markers, info windows, etc. */ }
        <StandaloneSearchBox onLoad={onSearchLoad} onPlacesChanged={onPlacesChanged}>
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
