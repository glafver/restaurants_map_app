import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useState} from 'react'
import RestaurantImage from '../assets/images/restaurant_example.jpeg'
import { getDistance } from 'geolib';


const ListRestaurants = ({ restaurants }) => {

	const [linearDistance, setLinearDistance] = useState(false);
  const [distances] = useState([]);
  
  function success(pos) {
    const crd = pos.coords;
    restaurants.forEach((restaurant) => {
      const distance = getDistance({ latitude: crd.latitude, longitude: crd.longitude }, {latitude: restaurant.geolocation.lat,longitude: restaurant.geolocation.lng}); 
      distances.push(distance);
    }
    )
  }

  function error(err) {
    setLinearDistance(false)
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error);

  const showData = () => {
    setLinearDistance(true)
  }

  return (

   <CardGroup className='restaurants-list overflow-scroll'>
        {restaurants.map((restaurant, index) => (
      <Card key={index} className='restaurant-card' onMouseOver={() => showData()}>
        <Card.Img variant="top" src={RestaurantImage} />
        <Card.Body>
          <Card.Title>{restaurant.name}</Card.Title>
          <Card.Text>
            {restaurant.description}
          </Card.Text>
        </Card.Body>
       {linearDistance && <Card.Footer>
          <p>Distance: {distances[index]} m</p>
        </Card.Footer>}
      </Card>
        ))}
    </CardGroup>
  );
}

export default ListRestaurants;