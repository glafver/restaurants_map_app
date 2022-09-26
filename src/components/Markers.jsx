import ListGroup from 'react-bootstrap/ListGroup'
import { Marker } from '@react-google-maps/api';

const Markers = ({ restaurants }) => {
	return (
		<ListGroup>
			{restaurants.map((restaurant, index) => (
				<Marker position={restaurant.geolocation} key={index}/>
			))}
		</ListGroup>
	)
}

export default Markers
