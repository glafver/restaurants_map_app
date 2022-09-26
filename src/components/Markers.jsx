import ListGroup from 'react-bootstrap/ListGroup'
import { Marker} from '@react-google-maps/api';
import { useState } from 'react'
import { InfoWindowF } from '@react-google-maps/api';


const Markers = ({ restaurants}) => {
	const [activeMarker, setActiveMarker] = useState(null);

	const divStyle = {
		background: `white`,
		border: `1px solid #ccc`,
		padding: 15
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
              <div style={divStyle}>Wiki</div>
            </InfoWindowF>
          ) : null}
				</Marker>
			))}
		</ListGroup>
	)
}

export default Markers
