import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useState } from 'react'
import RestaurantImage from '../assets/images/restaurant_example.jpeg'
import { getDistance } from 'geolib';
import usePosition from '../hooks/usePosition'


const ListRestaurants = ({ restaurants}) => {

  const position = usePosition();
	const [linearDistance, setLinearDistance] = useState(null);

    const distanceInMeters = (restaurantPosition) => {
        console.log('restaurantPosition', restaurantPosition)
        console.log('myposition', position.latitude, position.longitude)
          const distance = getDistance({ latitude: position.latitude, longitude: position.longitude }, {latitude: restaurantPosition.lat,longitude: restaurantPosition.lng}); 
          console.log('distance',distance)
          setLinearDistance(distance)
      }

  return (

    <CardGroup className='restaurants-list overflow-scroll'>
        {restaurants.map((restaurant, index) => (
      <Card key={index} className='restaurant-card' onLoad={() => distanceInMeters(restaurant.geolocation)}>
        <Card.Img variant="top" src={RestaurantImage} />
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Text>
            {restaurant.description}
          </Card.Text>
        </Card.Body>
        {linearDistance !== null && <Card.Footer >
          {linearDistance}
        </Card.Footer>}
      </Card>
        ))}
    </CardGroup>
  );
}

export default ListRestaurants;