import ListGroup from 'react-bootstrap/ListGroup'
import { Marker} from '@react-google-maps/api';
import { useState } from 'react'
import { InfoWindowF } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

const Markers = ({ restaurants}) => {
	const [activeMarker, setActiveMarker] = useState(null);

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
  
	return (
		<ListGroup>
			{restaurants.map((restaurant, index) => (
			<Marker position={restaurant.geolocation} key={index} onClick={() => handleActiveMarker(index)}>
			{activeMarker === index ? (
            <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
              <div className='restaurant-info-window'>
				<p className='restaurant-info'><span className='restaurant-info-bold'>Name: </span>{restaurant.name ? restaurant.name : ''}</p>
				<p className='restaurant-info'><span className='restaurant-info-bold'>Adress: </span>{restaurant.adress ? restaurant.adress : ''}</p>
				<p className='restaurant-info'><span className='restaurant-info-bold'>Cuisine: </span>{restaurant.cuisine ? restaurant.cuisine : ''}</p>
				<p className='restaurant-info'><span className='restaurant-info-bold'>Description: </span>{restaurant.description ? restaurant.description : ''}</p>
				<p className='restaurant-info'><span className='restaurant-info-bold'>Type: </span>{restaurant.type ? restaurant.type : ''}</p>
				<Link onClick={() => getDirection(restaurant.geolocation)}>Get direction</Link>
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
