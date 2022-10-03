import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useState, useEffect} from 'react'
import RestaurantImage from '../assets/images/restaurant_example.jpeg'
import { getDistance } from 'geolib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faLocationDot, faCircleInfo, faRoute } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const ListRestaurants = ({ restaurants }) => {

	const [linearDistance, setLinearDistance] = useState(false);
  const [distances] = useState([]);
  
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



  return (

   <CardGroup className='restaurants-list overflow-scroll'>
        {restaurants.map((restaurant, index) => (
      <Card key={index} className='restaurant-card'>
        <Card.Img variant="top" src={RestaurantImage} />
        <Card.Body className='card-body'>
          <Card.Title className='restaurant-card-title'>{restaurant.name}</Card.Title>
          <div>
          <p className='card-restaurant-info'> <FontAwesomeIcon className='card-icons' icon={faLocationDot} /> {restaurant.adress}</p>
          <p className='card-restaurant-info'><FontAwesomeIcon className='card-icons' icon={faUtensils} /> {restaurant.cuisine}</p>
          <p className='card-restaurant-info'><FontAwesomeIcon className='card-icons' icon={faCircleInfo} /><Link className='nav-color' to={`/restaurants/${restaurant.id}`}>More info</Link> </p>
          <Link className='nav-color direction-link' onClick={() => getDirection(restaurant.geolocation)}>Get direction</Link>
          </div>
        </Card.Body>
       {linearDistance && <Card.Footer className='card-footer'>
       <FontAwesomeIcon className='card-icons' icon={faRoute} /> {distances[index]} m
        </Card.Footer>}
      </Card>
        ))}
    </CardGroup>
  );
}

export default ListRestaurants;