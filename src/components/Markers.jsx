import ListGroup from 'react-bootstrap/ListGroup'
import { Marker} from '@react-google-maps/api';
import { useState } from 'react'
import { InfoWindowF } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import { getDistance } from 'geolib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faLocationDot, faCircleInfo, faRoute, faBook } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import RestaurantMarker from '../assets/icons/restaurant-marker.png'

const Markers = ({ restaurants}) => {
	const [activeMarker, setActiveMarker] = useState(null);
	const [linearDistance, setLinearDistance] = useState(false);
	const [distances] = useState([]);

	const getDirection = (geo) => {
	const googleLink = 'https://www.google.com/maps/dir/?api=1&destination=';
	const position = `${geo.lat},${geo.lng}`;
	const destinationToURL = encodeURIComponent(position);
	const destinantionLink = googleLink + destinationToURL;
	window.open(destinantionLink, '_blank')
	}
	
	const handleActiveMarker = (marker) => {
	  if (marker === activeMarker) {
		return;
	  }
	  setActiveMarker(marker);
	};

	useEffect(()=> {
		navigator.geolocation.getCurrentPosition(success, error);
		function success(pos) {
		  const crd = pos.coords;
		  restaurants.forEach((restaurant) => {
			const distance = getDistance({ latitude: crd.latitude, longitude: crd.longitude }, {latitude: restaurant.geolocation.lat,longitude: restaurant.geolocation.lng}); 
			distances.push(distance);
		  }
		  )
		  setLinearDistance(true)
		}
		function error(err) {
		  setLinearDistance(false)
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		}
	},[])

	const handleInfoWindow = () => {
		setActiveMarker(null)
	}
  
	return (
		<ListGroup>
			{restaurants.map((restaurant, index) => (
			<Marker position={restaurant.geolocation} key={index} onClick={() => handleActiveMarker(index)} icon={RestaurantMarker}>
			{activeMarker === index ? (
            <InfoWindowF onCloseClick={() => handleInfoWindow()}>
              <div className='restaurant-info-window'>
				<p className='restaurant-title'>{restaurant.name ? restaurant.name : ''}</p>
				<p className='restaurant-info'><FontAwesomeIcon className='card-icons' icon={faLocationDot} />{restaurant.adress ? restaurant.adress : ''}</p>
				<p className='restaurant-info'><FontAwesomeIcon className='card-icons' icon={faUtensils} />{restaurant.cuisine ? restaurant.cuisine : ''}, {restaurant.type ? restaurant.type : ''}</p>
				<p className='restaurant-info'><FontAwesomeIcon className='card-icons' icon={faBook} />{restaurant.description ? restaurant.description : ''}</p>
				<p className='restaurant-info'><FontAwesomeIcon className='card-icons' icon={faCircleInfo} /><Link className='nav-color' to={`/restaurants/${restaurant.id}`}>More info</Link> </p>

				{linearDistance && <p className='restaurant-info'> <FontAwesomeIcon className='card-icons' icon={faRoute} /> {distances[index]} m </p>}
				<Link className='nav-color direction-link' onClick={() => getDirection(restaurant.geolocation)}>Get direction</Link><br/>
				</div>
            </InfoWindowF>
          ) : null}
				</Marker>
			))}
		</ListGroup>
	)
}

export default Markers
