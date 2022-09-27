import ListGroup from 'react-bootstrap/ListGroup'
import { Marker} from '@react-google-maps/api';
import { useState } from 'react'
import { InfoWindowF } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import usePosition from '../hooks/usePosition'

const Markers = ({ restaurants}) => {
	const [activeMarker, setActiveMarker] = useState(null);
	const position = usePosition();
	const [linearDistance, setLinearDistance] = useState(null);


	const getDirection = (geo) => {
	const googleLink = 'https://www.google.com/maps/dir/?api=1&destination=';
	const position = `${geo.lat},${geo.lng}`;
	const destinationToURL = encodeURIComponent(position);
	const destinantionLink = googleLink + destinationToURL;
	window.open(destinantionLink, '_blank')
	}

	const distanceInMeters = (dist) => {
	const pos1 = new google.maps.LatLng(dist.lat, dist.lng);
	const pos2 = new google.maps.LatLng(position.latitude, position.longitude);
	const distance = google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2);
	setLinearDistance(distance.toFixed(2))
	}
  
	const handleActiveMarker = (marker) => {
		setLinearDistance(null);
	  if (marker === activeMarker) {
		return;
	  }
	  setActiveMarker(marker);
	};

	const handleInfoWindow = () => {
		setActiveMarker(null)
		setLinearDistance(null)
	}
  
	return (
		<ListGroup>
			{restaurants.map((restaurant, index) => (
			<Marker position={restaurant.geolocation} key={index} onClick={() => handleActiveMarker(index)}>
			{activeMarker === index ? (
            <InfoWindowF onLoad={() => distanceInMeters(restaurant.geolocation)} onCloseClick={() => handleInfoWindow()}>
              <div className='restaurant-info-window'>
				<p className='restaurant-info'><span className='restaurant-info-bold'>Name: </span>{restaurant.name ? restaurant.name : ''}</p>
				<p className='restaurant-info'><span className='restaurant-info-bold'>Adress: </span>{restaurant.adress ? restaurant.adress : ''}</p>
				<p className='restaurant-info'><span className='restaurant-info-bold'>Cuisine: </span>{restaurant.cuisine ? restaurant.cuisine : ''}</p>
				<p className='restaurant-info'><span className='restaurant-info-bold'>Description: </span>{restaurant.description ? restaurant.description : ''}</p>
				<p className='restaurant-info'><span className='restaurant-info-bold'>Type: </span>{restaurant.type ? restaurant.type : ''}</p>
				{position.latitude !== undefined && <p><span className='restaurant-info-bold'>Distance: </span> {linearDistance} m</p>}
				<Link onClick={() => getDirection(restaurant.geolocation)}>Get direction</Link><br></br>
				{restaurant.phone && <p className='restaurant-info'><span className='restaurant-info-bold'>Phone: </span>{restaurant.phone}</p>}
				{restaurant.email && <p className='restaurant-info'><span className='restaurant-info-bold'>E-mail: </span>{restaurant.email}</p>}
				{restaurant.website && <p className='restaurant-info'><span className='restaurant-info-bold'>Website: </span>{restaurant.website}</p>}
				{restaurant.facebook && <p className='restaurant-info'><span className='restaurant-info-bold'>Facebook: </span>{restaurant.facebook}</p>}
				{restaurant.instagram && <p className='restaurant-info'><span className='restaurant-info-bold'>Instagram: </span>{restaurant.instagram}</p>}
				</div>
            </InfoWindowF>
          ) : null}
				</Marker>
			))}
		</ListGroup>
	)
}

export default Markers
