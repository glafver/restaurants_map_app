import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { GoogleMap, useJsApiLoader} from '@react-google-maps/api';
import RestaurantImage from '../assets/images/restaurant_example.jpeg'

const RestaurantPage = () => {


	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	  });

	  const containerStyle = {
		width: '100%',
		height: '300px'
	  };

	return (
		<div className="restaurant-page-container">
		
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Restaurant Title</Card.Title>
							<Card.Text>Some text about the Restaurant</Card.Text>
							<Card.Img variant="top" src={RestaurantImage} />
						</Card.Body>
					</Card>
					{isLoaded && <GoogleMap
        			mapContainerStyle={containerStyle}
        			center={{lat: 55.606,lng: 13.021}}
        			zoom={12}
      				></GoogleMap>}
				</Col>
			</Row>
			<Row>
				<Col md={{ span: 6, offset: 3 }}></Col>
			</Row>
		</Container>
		</div>
	);
};

export default RestaurantPage;
